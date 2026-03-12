import AccessControl "./authorization/access-control";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Prim "mo:prim";
import Runtime "mo:core/Runtime";

actor {
  // ===== Types =====
  public type ApprovalMode  = { #instant; #manual };
  public type RideStatus    = { #active; #completed; #cancelled };
  public type BookingStatus = { #pending; #confirmed; #rejected };

  // Original User type — kept exactly as deployed to preserve stable variable compatibility
  public type User = {
    id               : Principal;
    name             : Text;
    avatarUrl        : Text;
    totalRatingPoints: Nat;
    ratingCount      : Nat;
  };

  // Extended profile fields stored separately to avoid stable-variable migration
  public type UserExt = {
    city             : Text;
    about            : Text;
    chatPref         : Text;    // "chatty" | "quiet" | ""
    petsPreference   : Text;    // "allowed" | "not_allowed" | ""
    smokingPreference: Text;    // "allowed" | "not_allowed" | ""
    luggagePreference: Text;    // "allowed" | "limited" | "none" | ""
    carBrand         : Text;
    carColor         : Text;
    vehicleType      : Text;    // "hatchback" | "sedan" | "suv" | ""
    licensePlate     : Text;
    facebookUrl      : Text;
    linkedinUrl      : Text;
  };

  public type Ride = {
    id            : Nat;
    driverId      : Principal;
    origin        : Text;
    destination   : Text;
    date          : Text;
    departureTime : Text;
    totalSeats    : Nat;
    seatsAvailable: Nat;
    pricePerSeat  : Nat;
    petsAllowed   : Bool;
    smokingAllowed: Bool;
    luggageAllowed: Bool;
    approvalMode  : ApprovalMode;
    status        : RideStatus;
    createdAt     : Int;
  };

  public type Booking = {
    id         : Nat;
    rideId     : Nat;
    riderId    : Principal;
    status     : BookingStatus;
    ratingGiven: ?Nat;
    createdAt  : Int;
  };

  // Combined public view merging User + UserExt
  public type UserPublic = {
    id               : Principal;
    name             : Text;
    avatarUrl        : Text;
    city             : Text;
    about            : Text;
    chatPref         : Text;
    petsPreference   : Text;
    smokingPreference: Text;
    luggagePreference: Text;
    carBrand         : Text;
    carColor         : Text;
    vehicleType      : Text;
    licensePlate     : Text;
    facebookUrl      : Text;
    linkedinUrl      : Text;
    averageRating    : Float;
    ratingCount      : Nat;
  };

  type UserEntry    = (Principal, User);
  type UserExtEntry = (Principal, UserExt);

  // ===== State =====
  var accessControlState = AccessControl.initState();
  var users         : [UserEntry]    = [];  // original stable var — type unchanged
  var usersExt      : [UserExtEntry] = [];  // new stable var for extended fields
  var rides         : [Ride]         = [];
  var bookings      : [Booking]      = [];
  var nextRideId    : Nat            = 1;
  var nextBookingId : Nat            = 1;

  // ===== Helpers =====
  func textContains(haystack : Text, needle : Text) : Bool {
    if (needle == "") return true;
    haystack.toLower().contains(#text (needle.toLower()))
  };

  func getUser(p : Principal) : ?User {
    switch (users.find(func(entry : UserEntry) : Bool { let (id, _) = entry; id == p })) {
      case (?(_, u)) ?u;
      case null null;
    }
  };

  func getUserExt(p : Principal) : UserExt {
    switch (usersExt.find(func(entry : UserExtEntry) : Bool { let (id, _) = entry; id == p })) {
      case (?(_, e)) e;
      case null {
        {
          city = ""; about = ""; chatPref = "";
          petsPreference = ""; smokingPreference = ""; luggagePreference = "";
          carBrand = ""; carColor = ""; vehicleType = "";
          licensePlate = ""; facebookUrl = ""; linkedinUrl = "";
        }
      };
    }
  };

  func userToPublic(u : User) : UserPublic {
    let ext = getUserExt(u.id);
    let avg : Float = if (u.ratingCount == 0) 0.0
                      else u.totalRatingPoints.toFloat() / u.ratingCount.toFloat();
    {
      id                = u.id;
      name              = u.name;
      avatarUrl         = u.avatarUrl;
      city              = ext.city;
      about             = ext.about;
      chatPref          = ext.chatPref;
      petsPreference    = ext.petsPreference;
      smokingPreference = ext.smokingPreference;
      luggagePreference = ext.luggagePreference;
      carBrand          = ext.carBrand;
      carColor          = ext.carColor;
      vehicleType       = ext.vehicleType;
      licensePlate      = ext.licensePlate;
      facebookUrl       = ext.facebookUrl;
      linkedinUrl       = ext.linkedinUrl;
      averageRating     = avg;
      ratingCount       = u.ratingCount;
    }
  };

  // ===== Auth =====
  public shared ({ caller }) func _initializeAccessControlWithSecret(userSecret : Text) : async () {
    switch (Prim.envVar<system>("CAFFEINE_ADMIN_TOKEN")) {
      case (null) { Runtime.trap("CAFFEINE_ADMIN_TOKEN environment variable is not set") };
      case (?adminToken) { AccessControl.initialize(accessControlState, caller, adminToken, userSecret) };
    };
  };

  public query ({ caller }) func getCallerUserRole() : async AccessControl.UserRole {
    AccessControl.getUserRole(accessControlState, caller)
  };

  public shared ({ caller }) func assignCallerUserRole(user : Principal, role : AccessControl.UserRole) : async () {
    AccessControl.assignRole(accessControlState, caller, user, role)
  };

  public query ({ caller }) func isCallerAdmin() : async Bool {
    AccessControl.isAdmin(accessControlState, caller)
  };

  // ===== User APIs =====
  public shared ({ caller }) func registerUser(name : Text, avatarUrl : Text) : async UserPublic {
    let updated : User = switch (getUser(caller)) {
      case (?u) { { u with name = name; avatarUrl = avatarUrl } };
      case null  { { id = caller; name = name; avatarUrl = avatarUrl; totalRatingPoints = 0; ratingCount = 0 } };
    };
    let filtered = users.filter(func(entry : UserEntry) : Bool { let (id, _) = entry; id != caller });
    users := [filtered, [(caller, updated)]].flatten();
    userToPublic(updated)
  };

  public shared ({ caller }) func updateUserProfile(
    name             : Text,
    avatarUrl        : Text,
    city             : Text,
    about            : Text,
    chatPref         : Text,
    petsPreference   : Text,
    smokingPreference: Text,
    luggagePreference: Text,
    carBrand         : Text,
    carColor         : Text,
    vehicleType      : Text,
    licensePlate     : Text,
    facebookUrl      : Text,
    linkedinUrl      : Text
  ) : async { #ok : UserPublic; #err : Text } {
    if (name == "") return #err("Name is required");

    // Update core User record (name + avatarUrl)
    let updatedUser : User = switch (getUser(caller)) {
      case (?u) { { u with name = name; avatarUrl = avatarUrl } };
      case null  { { id = caller; name = name; avatarUrl = avatarUrl; totalRatingPoints = 0; ratingCount = 0 } };
    };
    let filteredUsers = users.filter(func(e : UserEntry) : Bool { let (id, _) = e; id != caller });
    users := [filteredUsers, [(caller, updatedUser)]].flatten();

    // Update extended UserExt record
    let updatedExt : UserExt = {
      city             = city;
      about            = about;
      chatPref         = chatPref;
      petsPreference   = petsPreference;
      smokingPreference= smokingPreference;
      luggagePreference= luggagePreference;
      carBrand         = carBrand;
      carColor         = carColor;
      vehicleType      = vehicleType;
      licensePlate     = licensePlate;
      facebookUrl      = facebookUrl;
      linkedinUrl      = linkedinUrl;
    };
    let filteredExt = usersExt.filter(func(e : UserExtEntry) : Bool { let (id, _) = e; id != caller });
    usersExt := [filteredExt, [(caller, updatedExt)]].flatten();

    #ok(userToPublic(updatedUser))
  };

  public query ({ caller }) func getMyProfile() : async ?UserPublic {
    switch (getUser(caller)) {
      case (?u) ?userToPublic(u);
      case null null;
    }
  };

  public query func getUserProfile(userId : Principal) : async ?UserPublic {
    switch (getUser(userId)) {
      case (?u) ?userToPublic(u);
      case null null;
    }
  };

  // ===== Ride APIs =====
  public shared ({ caller }) func postRide(
    origin        : Text,
    destination   : Text,
    date          : Text,
    departureTime : Text,
    totalSeats    : Nat,
    pricePerSeat  : Nat,
    petsAllowed   : Bool,
    smokingAllowed: Bool,
    luggageAllowed: Bool,
    approvalMode  : ApprovalMode
  ) : async { #ok : Ride; #err : Text } {
    if (pricePerSeat == 0) return #err("Price per seat is required and must be greater than 0");
    if (totalSeats == 0)   return #err("Total seats must be greater than 0");
    if (origin == "")      return #err("Origin is required");
    if (destination == "") return #err("Destination is required");
    let ride : Ride = {
      id             = nextRideId;
      driverId       = caller;
      origin         = origin;
      destination    = destination;
      date           = date;
      departureTime  = departureTime;
      totalSeats     = totalSeats;
      seatsAvailable = totalSeats;
      pricePerSeat   = pricePerSeat;
      petsAllowed    = petsAllowed;
      smokingAllowed = smokingAllowed;
      luggageAllowed = luggageAllowed;
      approvalMode   = approvalMode;
      status         = #active;
      createdAt      = Time.now();
    };
    nextRideId += 1;
    rides := [rides, [ride]].flatten();
    #ok(ride)
  };

  public query func searchRides(origin : Text, destination : Text, date : Text) : async [Ride] {
    let filtered = rides.filter(func(r : Ride) : Bool {
      r.status == #active and
      r.seatsAvailable > 0 and
      textContains(r.origin, origin) and
      textContains(r.destination, destination) and
      (date == "" or r.date == date)
    });
    filtered.sort(func(a : Ride, b : Ride) : { #less; #equal; #greater } {
      Text.compare(a.departureTime, b.departureTime)
    })
  };

  public query func getRideDetail(rideId : Nat) : async ?Ride {
    rides.find(func(r : Ride) : Bool { r.id == rideId })
  };

  public shared ({ caller }) func completeRide(rideId : Nat) : async { #ok; #err : Text } {
    switch (rides.find(func(r : Ride) : Bool { r.id == rideId })) {
      case null { #err("Ride not found") };
      case (?r) {
        if (r.driverId != caller) return #err("Only the driver can complete this ride");
        if (r.status != #active)  return #err("Ride is not active");
        rides := rides.map(func(ri : Ride) : Ride {
          if (ri.id == rideId) { { ri with status = #completed } } else ri
        });
        #ok
      };
    }
  };

  public query ({ caller }) func getMyPostedRides() : async [Ride] {
    rides.filter(func(r : Ride) : Bool { r.driverId == caller })
  };

  // ===== Booking APIs =====
  public shared ({ caller }) func bookRide(rideId : Nat) : async { #ok : Booking; #err : Text } {
    switch (rides.find(func(r : Ride) : Bool { r.id == rideId })) {
      case null { #err("Ride not found") };
      case (?r) {
        if (r.status != #active)   return #err("Ride is not active");
        if (r.seatsAvailable == 0) return #err("No seats available");
        if (r.driverId == caller)  return #err("Driver cannot book their own ride");
        let exists = bookings.find(func(b : Booking) : Bool {
          b.rideId == rideId and b.riderId == caller and
          (b.status == #pending or b.status == #confirmed)
        });
        switch (exists) {
          case (?_) { return #err("You already have a booking for this ride") };
          case null {};
        };
        let bStatus : BookingStatus = switch (r.approvalMode) {
          case (#instant) #confirmed;
          case (#manual)  #pending;
        };
        let booking : Booking = {
          id          = nextBookingId;
          rideId      = rideId;
          riderId     = caller;
          status      = bStatus;
          ratingGiven = null;
          createdAt   = Time.now();
        };
        nextBookingId += 1;
        bookings := [bookings, [booking]].flatten();
        if (r.approvalMode == #instant) {
          rides := rides.map(func(ri : Ride) : Ride {
            if (ri.id == rideId) { { ri with seatsAvailable = ri.seatsAvailable - 1 } } else ri
          });
        };
        #ok(booking)
      };
    }
  };

  public query ({ caller }) func getMyBookings() : async [Booking] {
    bookings.filter(func(b : Booking) : Bool { b.riderId == caller })
  };

  public query ({ caller }) func getBookingRequestsForDriver() : async [Booking] {
    let myRideIds = rides
      .filter(func(r : Ride) : Bool { r.driverId == caller })
      .map(func(r : Ride) : Nat { r.id });
    bookings.filter(func(b : Booking) : Bool {
      b.status == #pending and
      myRideIds.find(func(id : Nat) : Bool { id == b.rideId }) != null
    })
  };

  public shared ({ caller }) func approveBooking(bookingId : Nat) : async { #ok; #err : Text } {
    switch (bookings.find(func(b : Booking) : Bool { b.id == bookingId })) {
      case null { #err("Booking not found") };
      case (?bk) {
        if (bk.status != #pending) return #err("Booking is not pending");
        switch (rides.find(func(r : Ride) : Bool { r.id == bk.rideId })) {
          case null { #err("Ride not found") };
          case (?r) {
            if (r.driverId != caller)  return #err("Only the driver can approve bookings");
            if (r.seatsAvailable == 0) return #err("No seats available");
            bookings := bookings.map(func(b : Booking) : Booking {
              if (b.id == bookingId) { { b with status = #confirmed } } else b
            });
            let rid = r.id;
            rides := rides.map(func(ri : Ride) : Ride {
              if (ri.id == rid) { { ri with seatsAvailable = ri.seatsAvailable - 1 } } else ri
            });
            #ok
          };
        }
      };
    }
  };

  public shared ({ caller }) func rejectBooking(bookingId : Nat) : async { #ok; #err : Text } {
    switch (bookings.find(func(b : Booking) : Bool { b.id == bookingId })) {
      case null { #err("Booking not found") };
      case (?bk) {
        if (bk.status != #pending) return #err("Booking is not pending");
        switch (rides.find(func(r : Ride) : Bool { r.id == bk.rideId })) {
          case null { #err("Ride not found") };
          case (?r) {
            if (r.driverId != caller) return #err("Only the driver can reject bookings");
            bookings := bookings.map(func(b : Booking) : Booking {
              if (b.id == bookingId) { { b with status = #rejected } } else b
            });
            #ok
          };
        }
      };
    }
  };

  public shared ({ caller }) func rateDriver(bookingId : Nat, rating : Nat) : async { #ok; #err : Text } {
    if (rating < 1 or rating > 5) return #err("Rating must be between 1 and 5");
    switch (bookings.find(func(b : Booking) : Bool { b.id == bookingId })) {
      case null { #err("Booking not found") };
      case (?bk) {
        if (bk.riderId != caller)    return #err("Only the rider can rate the driver");
        if (bk.status != #confirmed) return #err("Booking must be confirmed to rate");
        switch (bk.ratingGiven) {
          case (?_) { return #err("You have already rated this driver") };
          case null {};
        };
        switch (rides.find(func(r : Ride) : Bool { r.id == bk.rideId })) {
          case null { #err("Ride not found") };
          case (?r) {
            if (r.status != #completed) return #err("Ride must be completed to rate");
            bookings := bookings.map(func(b : Booking) : Booking {
              if (b.id == bookingId) { { b with ratingGiven = ?rating } } else b
            });
            let dId = r.driverId;
            users := users.map(func(entry : UserEntry) : UserEntry {
              let (id, u) = entry;
              if (id == dId) (id, { u with totalRatingPoints = u.totalRatingPoints + rating; ratingCount = u.ratingCount + 1 })
              else (id, u)
            });
            #ok
          };
        }
      };
    }
  };
}
