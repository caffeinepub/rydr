import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, MessageCircle, Send } from "lucide-react";
import { useRef, useState } from "react";

// ── Types ──────────────────────────────────────────────────────

type Message = {
  id: string;
  text: string;
  fromMe: boolean;
  time: string;
};

type Conversation = {
  id: string;
  name: string;
  initials: string;
  lastMessage: string;
  time: string;
  unread: number;
  messages: Message[];
};

// ── Mock data ──────────────────────────────────────────────────

const CONVERSATIONS: Conversation[] = [
  {
    id: "conv-1",
    name: "Rahul Verma",
    initials: "RV",
    lastMessage: "See you at Mumbai Central at 7 AM!",
    time: "09:42 AM",
    unread: 2,
    messages: [
      {
        id: "m1",
        text: "Hi! I booked a seat on your ride to Pune.",
        fromMe: true,
        time: "09:30 AM",
      },
      {
        id: "m2",
        text: "Great! I'll pick you up from Mumbai Central.",
        fromMe: false,
        time: "09:35 AM",
      },
      {
        id: "m3",
        text: "Perfect, what time exactly?",
        fromMe: true,
        time: "09:38 AM",
      },
      {
        id: "m4",
        text: "See you at Mumbai Central at 7 AM!",
        fromMe: false,
        time: "09:42 AM",
      },
    ],
  },
  {
    id: "conv-2",
    name: "Kavya Reddy",
    initials: "KR",
    lastMessage: "Sure, luggage is fine. Just one bag?",
    time: "Yesterday",
    unread: 0,
    messages: [
      {
        id: "m1",
        text: "Hello Kavya, is luggage allowed on your Bengaluru ride?",
        fromMe: true,
        time: "Yesterday, 3:10 PM",
      },
      {
        id: "m2",
        text: "Sure, luggage is fine. Just one bag?",
        fromMe: false,
        time: "Yesterday, 3:25 PM",
      },
    ],
  },
  {
    id: "conv-3",
    name: "Vikram Singh",
    initials: "VS",
    lastMessage: "Booking confirmed! See you on Sunday.",
    time: "Mon",
    unread: 0,
    messages: [
      {
        id: "m1",
        text: "Your booking for Delhi → Agra has been confirmed.",
        fromMe: false,
        time: "Mon, 11:00 AM",
      },
      {
        id: "m2",
        text: "Great, thanks!",
        fromMe: true,
        time: "Mon, 11:05 AM",
      },
      {
        id: "m3",
        text: "Booking confirmed! See you on Sunday.",
        fromMe: false,
        time: "Mon, 11:06 AM",
      },
    ],
  },
  {
    id: "conv-4",
    name: "Priya Sharma",
    initials: "PS",
    lastMessage: "I'll share my live location closer to the date.",
    time: "Sun",
    unread: 1,
    messages: [
      {
        id: "m1",
        text: "Hi, I'm Priya — your co-passenger for the Jaipur trip!",
        fromMe: false,
        time: "Sun, 6:00 PM",
      },
      {
        id: "m2",
        text: "Hey Priya! Excited for the trip.",
        fromMe: true,
        time: "Sun, 6:05 PM",
      },
      {
        id: "m3",
        text: "I'll share my live location closer to the date.",
        fromMe: false,
        time: "Sun, 6:10 PM",
      },
    ],
  },
];

// ── Message Thread ─────────────────────────────────────────────

function MessageThread({
  conversation,
  onBack,
}: {
  conversation: Conversation;
  onBack: () => void;
}) {
  const [messages, setMessages] = useState<Message[]>(conversation.messages);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      text,
      fromMe: true,
      time: new Date().toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full" data-ocid="chat.thread.panel">
      {/* Thread header */}
      <div
        className="flex items-center gap-3 px-4 py-3 border-b border-border/50"
        style={{ background: "oklch(0.12 0.03 240)" }}
      >
        <button
          type="button"
          onClick={onBack}
          className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-muted/50 transition-colors"
          aria-label="Back to conversations"
          data-ocid="chat.thread.back.button"
        >
          <ArrowLeft className="h-4 w-4 text-muted-foreground" />
        </button>
        <Avatar className="h-8 w-8">
          <AvatarFallback
            className="text-xs font-bold"
            style={{
              background: "oklch(0.72 0.22 145 / 0.15)",
              color: "oklch(0.72 0.22 145)",
            }}
          >
            {conversation.initials}
          </AvatarFallback>
        </Avatar>
        <p className="font-bold text-sm text-foreground">{conversation.name}</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-0">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.fromMe ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm leading-snug ${
                msg.fromMe
                  ? "rounded-br-sm text-black"
                  : "rounded-bl-sm text-foreground"
              }`}
              style={{
                background: msg.fromMe
                  ? "oklch(0.72 0.22 145)"
                  : "oklch(0.17 0.03 240)",
              }}
            >
              <p>{msg.text}</p>
              <p
                className="text-[10px] mt-1 opacity-60 text-right"
                style={{ fontFamily: '"Figtree", system-ui, sans-serif' }}
              >
                {msg.time}
              </p>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input bar */}
      <div
        className="flex items-center gap-2 px-4 py-3 border-t border-border/50"
        style={{ background: "oklch(0.12 0.03 240)" }}
      >
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="flex-1 h-9 text-sm bg-background border-border/50 rounded-full px-4 focus-visible:ring-1"
          data-ocid="chat.input"
          style={{ fontFamily: '"Figtree", system-ui, sans-serif' }}
        />
        <Button
          type="button"
          size="icon"
          className="h-9 w-9 rounded-full shrink-0"
          onClick={handleSend}
          disabled={!input.trim()}
          data-ocid="chat.send_button"
          aria-label="Send message"
          style={{ background: "oklch(0.72 0.22 145)" }}
        >
          <Send className="h-4 w-4 text-black" />
        </Button>
      </div>
    </div>
  );
}

// ── Conversation List ──────────────────────────────────────────

function ConversationList({
  conversations,
  onSelect,
}: {
  conversations: Conversation[];
  onSelect: (c: Conversation) => void;
}) {
  return (
    <div data-ocid="chat.list">
      {conversations.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-20 px-6 text-center"
          data-ocid="chat.empty_state"
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
            style={{ background: "oklch(0.72 0.22 145 / 0.1)" }}
          >
            <MessageCircle
              className="h-8 w-8"
              style={{ color: "oklch(0.72 0.22 145)" }}
            />
          </div>
          <p className="text-base font-bold text-foreground mb-1">
            No messages right now
          </p>
          <p className="text-sm text-muted-foreground">
            Book or publish a ride to start chatting.
          </p>
        </div>
      ) : (
        <ul>
          {conversations.map((conv, idx) => (
            <li key={conv.id} data-ocid={`chat.item.${idx + 1}`}>
              <button
                type="button"
                className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-muted/20 transition-colors border-b border-border/30 last:border-0 text-left"
                onClick={() => onSelect(conv)}
              >
                <Avatar className="h-11 w-11 shrink-0">
                  <AvatarFallback
                    className="font-bold text-sm"
                    style={{
                      background: "oklch(0.72 0.22 145 / 0.15)",
                      color: "oklch(0.72 0.22 145)",
                    }}
                  >
                    {conv.initials}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <p className="font-bold text-sm text-foreground truncate">
                      {conv.name}
                    </p>
                    <span className="text-[11px] text-muted-foreground shrink-0 ml-2">
                      {conv.time}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate leading-snug">
                    {conv.lastMessage}
                  </p>
                </div>

                {conv.unread > 0 && (
                  <Badge
                    className="shrink-0 h-5 min-w-5 px-1.5 text-[10px] font-bold rounded-full text-black"
                    style={{ background: "oklch(0.72 0.22 145)" }}
                  >
                    {conv.unread}
                  </Badge>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ── ChatPage ───────────────────────────────────────────────────

export function ChatPage() {
  const [activeConversation, setActiveConversation] =
    useState<Conversation | null>(null);

  return (
    <div
      className="min-h-screen flex flex-col bg-background"
      data-ocid="chat.page"
    >
      {activeConversation ? (
        /* Thread view */
        <div className="flex flex-col flex-1 h-screen">
          <MessageThread
            conversation={activeConversation}
            onBack={() => setActiveConversation(null)}
          />
        </div>
      ) : (
        /* Conversation list */
        <>
          {/* Header */}
          <div
            className="sticky top-0 z-10 px-4 pt-5 pb-3 border-b border-border/30"
            style={{ background: "oklch(0.09 0.03 240)" }}
          >
            <h1
              className="text-2xl text-foreground"
              style={{
                fontFamily: '"Cabinet Grotesk", system-ui, sans-serif',
                fontWeight: 800,
                letterSpacing: "-0.02em",
              }}
            >
              Chat
            </h1>
          </div>

          {/* List */}
          <ConversationList
            conversations={CONVERSATIONS}
            onSelect={setActiveConversation}
          />
        </>
      )}
    </div>
  );
}
