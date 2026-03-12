import { useQuery } from "@tanstack/react-query";
import { useActor } from "./useActor";
import { useGoogleAuth } from "./useGoogleAuth";

const ADMIN_EMAIL = "aman5875@gmail.com";

export function useIsAdmin() {
  const { actor, isFetching } = useActor();
  const { googleUser } = useGoogleAuth();

  return useQuery<boolean>({
    queryKey: ["isAdmin", googleUser?.email],
    queryFn: async () => {
      // Auto-admin for the designated email
      if (googleUser?.email === ADMIN_EMAIL) return true;
      if (!actor) return false;
      try {
        return await actor.isCallerAdmin();
      } catch {
        return false;
      }
    },
    enabled: !isFetching,
  });
}
