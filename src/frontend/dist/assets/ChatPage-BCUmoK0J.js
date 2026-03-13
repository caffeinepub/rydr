import { z as createLucideIcon, r as reactExports, j as jsxRuntimeExports, a9 as Avatar, ab as AvatarFallback, ae as Lock, $ as Input, B as Button, am as MessageCircle, l as Badge, w as ue } from "./index-Cxot6pCg.js";
import { A as ArrowLeft } from "./arrow-left-BLk0IWFB.js";
import { P as Phone } from "./phone-CzEcr_Vv.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
];
const Send = createLucideIcon("send", __iconNode);
const CONVERSATIONS = [
  {
    id: "conv-1",
    name: "Rahul Verma",
    initials: "RV",
    lastMessage: "See you at Mumbai Central at 7 AM!",
    time: "09:42 AM",
    unread: 2,
    phone: "+919876543210",
    isAccepted: true,
    messages: [
      {
        id: "m1",
        text: "Hi! I booked a seat on your ride to Pune.",
        fromMe: true,
        time: "09:30 AM"
      },
      {
        id: "m2",
        text: "Great! I'll pick you up from Mumbai Central.",
        fromMe: false,
        time: "09:35 AM"
      },
      {
        id: "m3",
        text: "Perfect, what time exactly?",
        fromMe: true,
        time: "09:38 AM"
      },
      {
        id: "m4",
        text: "See you at Mumbai Central at 7 AM!",
        fromMe: false,
        time: "09:42 AM"
      }
    ]
  },
  {
    id: "conv-2",
    name: "Kavya Reddy",
    initials: "KR",
    lastMessage: "Sure, luggage is fine. Just one bag?",
    time: "Yesterday",
    unread: 0,
    phone: "+919823456789",
    isPhoneHidden: true,
    isAccepted: true,
    messages: [
      {
        id: "m1",
        text: "Hello Kavya, is luggage allowed on your Bengaluru ride?",
        fromMe: true,
        time: "Yesterday, 3:10 PM"
      },
      {
        id: "m2",
        text: "Sure, luggage is fine. Just one bag?",
        fromMe: false,
        time: "Yesterday, 3:25 PM"
      }
    ]
  },
  {
    id: "conv-3",
    name: "Vikram Singh",
    initials: "VS",
    lastMessage: "Booking confirmed! See you on Sunday.",
    time: "Mon",
    unread: 0,
    phone: "+919701234567",
    isAccepted: true,
    messages: [
      {
        id: "m1",
        text: "Your booking for Delhi → Agra has been confirmed.",
        fromMe: false,
        time: "Mon, 11:00 AM"
      },
      {
        id: "m2",
        text: "Great, thanks!",
        fromMe: true,
        time: "Mon, 11:05 AM"
      },
      {
        id: "m3",
        text: "Booking confirmed! See you on Sunday.",
        fromMe: false,
        time: "Mon, 11:06 AM"
      }
    ]
  },
  {
    id: "conv-4",
    name: "Priya Sharma",
    initials: "PS",
    lastMessage: "I'll share my live location closer to the date.",
    time: "Sun",
    unread: 1,
    isAccepted: true,
    messages: [
      {
        id: "m1",
        text: "Hi, I'm Priya — your co-passenger for the Jaipur trip!",
        fromMe: false,
        time: "Sun, 6:00 PM"
      },
      {
        id: "m2",
        text: "Hey Priya! Excited for the trip.",
        fromMe: true,
        time: "Sun, 6:05 PM"
      },
      {
        id: "m3",
        text: "I'll share my live location closer to the date.",
        fromMe: false,
        time: "Sun, 6:10 PM"
      }
    ]
  },
  {
    id: "conv-5",
    name: "Arjun Mehta",
    initials: "AM",
    lastMessage: "Booking request sent",
    time: "Just now",
    unread: 0,
    isAccepted: false,
    messages: []
  }
];
function CallButton({ phone, name }) {
  const handleCall = () => {
    if (window.innerWidth < 768) {
      window.location.href = `tel:${phone}`;
    } else {
      navigator.clipboard.writeText(phone).then(() => {
        ue.success(`${name}'s number copied: ${phone}`);
      }).catch(() => {
        ue.info(`${name}'s number: ${phone}`);
      });
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      onClick: handleCall,
      className: "w-8 h-8 rounded-full flex items-center justify-center hover:bg-green-500/20 transition-colors",
      "aria-label": `Call ${name}`,
      "data-ocid": "chat.call.button",
      title: window.innerWidth < 768 ? `Call ${name}` : `Copy ${name}'s number`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-4 w-4 text-green-400" })
    }
  );
}
function MessageThread({
  conversation,
  onBack
}) {
  const [messages, setMessages] = reactExports.useState(conversation.messages);
  const [input, setInput] = reactExports.useState("");
  const bottomRef = reactExports.useRef(null);
  const isAccepted = conversation.isAccepted !== false;
  const handleSend = () => {
    if (!isAccepted) return;
    const text = input.trim();
    if (!text) return;
    const newMsg = {
      id: `msg-${Date.now()}`,
      text,
      fromMe: true,
      time: (/* @__PURE__ */ new Date()).toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit"
      })
    };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");
    setTimeout(() => {
      var _a;
      (_a = bottomRef.current) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full", "data-ocid": "chat.thread.panel", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center gap-3 px-4 py-3 border-b border-border/50",
        style: { background: "oklch(0.12 0.03 240)" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: onBack,
              className: "w-8 h-8 rounded-full flex items-center justify-center hover:bg-muted/50 transition-colors",
              "aria-label": "Back to conversations",
              "data-ocid": "chat.thread.back.button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4 text-muted-foreground" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { className: "h-8 w-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            AvatarFallback,
            {
              className: "text-xs font-bold",
              style: {
                background: "oklch(0.72 0.22 145 / 0.15)",
                color: "oklch(0.72 0.22 145)"
              },
              children: conversation.initials
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-sm text-foreground flex-1", children: conversation.name }),
          isAccepted && conversation.phone && !conversation.isPhoneHidden && /* @__PURE__ */ jsxRuntimeExports.jsx(CallButton, { phone: conversation.phone, name: conversation.name })
        ]
      }
    ),
    !isAccepted ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "px-4 py-3 text-xs text-center border-b border-border/30 flex items-center justify-center gap-2",
        style: { background: "oklch(0.12 0.05 60)" },
        "data-ocid": "chat.acceptance_gate.panel",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-3.5 w-3.5 text-yellow-400 shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "oklch(0.85 0.12 80)" }, children: "Chat will be available once the driver accepts your booking request." })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "px-4 py-2 text-xs text-center border-b border-border/30",
        style: {
          background: "oklch(0.10 0.03 240)",
          color: "oklch(0.65 0.05 240)"
        },
        children: conversation.isPhoneHidden ? "Driver has chosen to keep number private. Use chat to coordinate." : "📱 Phone numbers are shared only after booking is confirmed."
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-0", children: [
      messages.length === 0 && isAccepted && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center text-muted-foreground text-sm py-8", children: "No messages yet. Say hi!" }),
      messages.map((msg) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `flex ${msg.fromMe ? "justify-end" : "justify-start"}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: `max-w-[75%] px-3 py-2 rounded-2xl text-sm leading-snug ${msg.fromMe ? "rounded-br-sm text-black" : "rounded-bl-sm text-foreground"}`,
              style: {
                background: msg.fromMe ? "oklch(0.72 0.22 145)" : "oklch(0.17 0.03 240)"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: msg.text }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-[10px] mt-1 opacity-60 text-right",
                    style: { fontFamily: '"Figtree", system-ui, sans-serif' },
                    children: msg.time
                  }
                )
              ]
            }
          )
        },
        msg.id
      )),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: bottomRef })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center gap-2 px-4 py-3 border-t border-border/50",
        style: { background: "oklch(0.12 0.03 240)" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: input,
              onChange: (e) => setInput(e.target.value),
              onKeyDown: handleKeyDown,
              placeholder: isAccepted ? "Type a message..." : "Chat locked — awaiting acceptance",
              className: "flex-1 h-9 text-sm bg-background border-border/50 rounded-full px-4 focus-visible:ring-1 disabled:opacity-60",
              disabled: !isAccepted,
              "data-ocid": "chat.message.input",
              style: { fontFamily: '"Figtree", system-ui, sans-serif' }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              size: "icon",
              className: "h-9 w-9 rounded-full shrink-0",
              onClick: handleSend,
              disabled: !input.trim() || !isAccepted,
              "data-ocid": "chat.send_button",
              "aria-label": "Send message",
              style: {
                background: isAccepted ? "oklch(0.72 0.22 145)" : "oklch(0.30 0.02 240)"
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-4 w-4 text-black" })
            }
          )
        ]
      }
    )
  ] });
}
function ConversationList({
  conversations,
  onSelect
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-ocid": "chat.list", children: conversations.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col items-center justify-center py-20 px-6 text-center",
      "data-ocid": "chat.empty_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-16 h-16 rounded-full flex items-center justify-center mb-4",
            style: { background: "oklch(0.72 0.22 145 / 0.1)" },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              MessageCircle,
              {
                className: "h-8 w-8",
                style: { color: "oklch(0.72 0.22 145)" }
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-bold text-foreground mb-1", children: "No messages right now" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Book or publish a ride to start chatting." })
      ]
    }
  ) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { children: conversations.map((conv, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { "data-ocid": `chat.item.${idx + 1}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      className: "w-full flex items-center gap-3 px-4 py-3.5 hover:bg-muted/20 transition-colors border-b border-border/30 last:border-0 text-left",
      onClick: () => onSelect(conv),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { className: "h-11 w-11 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          AvatarFallback,
          {
            className: "font-bold text-sm",
            style: {
              background: "oklch(0.72 0.22 145 / 0.15)",
              color: "oklch(0.72 0.22 145)"
            },
            children: conv.initials
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-0.5 gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-sm text-foreground truncate", children: conv.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 shrink-0", children: [
              conv.isAccepted === false && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Lock,
                {
                  className: "h-3 w-3 text-yellow-400",
                  "aria-label": "Awaiting acceptance"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-muted-foreground", children: conv.time })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground truncate leading-snug", children: conv.isAccepted === false ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-yellow-500/80 text-xs", children: "🔒 Awaiting acceptance" }) : conv.lastMessage })
        ] }),
        conv.unread > 0 && conv.isAccepted !== false && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Badge,
          {
            className: "shrink-0 h-5 min-w-5 px-1.5 text-[10px] font-bold rounded-full text-black",
            style: { background: "oklch(0.72 0.22 145)" },
            children: conv.unread
          }
        )
      ]
    }
  ) }, conv.id)) }) });
}
function ChatPage() {
  const [activeConversation, setActiveConversation] = reactExports.useState(null);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "min-h-screen flex flex-col bg-background",
      "data-ocid": "chat.page",
      children: activeConversation ? (
        /* Thread view */
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col flex-1 h-screen", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          MessageThread,
          {
            conversation: activeConversation,
            onBack: () => setActiveConversation(null)
          }
        ) })
      ) : (
        /* Conversation list */
        /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "sticky top-0 z-10 px-4 pt-5 pb-3 border-b border-border/30",
              style: { background: "oklch(0.09 0.03 240)" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h1",
                {
                  className: "text-2xl text-foreground",
                  style: {
                    fontFamily: '"Cabinet Grotesk", system-ui, sans-serif',
                    fontWeight: 800,
                    letterSpacing: "-0.02em"
                  },
                  children: "Chat"
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ConversationList,
            {
              conversations: CONVERSATIONS,
              onSelect: setActiveConversation
            }
          )
        ] })
      )
    }
  );
}
export {
  ChatPage
};
