"use client";

import { useEffect, useRef, useState } from "react";
import QuoteSummary from "./QuoteSummary";
import EmailModal from "./EmailModal";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface QuoteData {
  species: string;
  use: string;
  dimensions: string;
  quantity: string;
  dryness: string;
  grade: string;
  finish: string;
  notes: string;
  trafficLight: "green" | "amber" | "red";
  trafficLightReason: string;
}

function extractQuote(text: string): { clean: string; data: QuoteData | null } {
  const match = text.match(/```quote-summary\n([\s\S]*?)\n```/);
  if (!match) return { clean: text, data: null };

  const clean = text.replace(/```quote-summary\n[\s\S]*?\n```/, "").trim();
  try {
    const data = JSON.parse(match[1]) as QuoteData;
    return { clean, data };
  } catch {
    return { clean: text, data: null };
  }
}

function renderMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/^### (.+)$/gm, '<h3 class="font-semibold text-forest-900 mt-3 mb-1">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="font-bold text-forest-900 mt-4 mb-1 text-base">$1</h2>')
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    .replace(/(<li>[\s\S]*?<\/li>)/g, (block) => `<ul>${block}</ul>`)
    .replace(/\n\n/g, "</p><p>")
    .replace(/\n/g, "<br/>")
    .replace(/^(?!<[hou]|<li)(.+)$/gm, (line) =>
      line.startsWith("<") ? line : line
    );
}

const INITIAL_MESSAGES: Record<string, Message> = {
  trade: {
    role: "assistant",
    content:
      "Morning — what are you after? Give me species, section, and length if you have them, or just tell me what the job is and we'll work it out from there.",
  },
  prosumer: {
    role: "assistant",
    content:
      "Hi there! Tell me a bit about what you're building — a deck, a frame, a garden structure? Once I know the project, I can help you figure out exactly what timber you need.",
  },
};

export default function ChatInterface({ userType }: { userType: string }) {
  const type = userType === "trade" ? "trade" : "prosumer";
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGES[type]]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [quoteData, setQuoteData] = useState<QuoteData | null>(null);
  const [quoteSummaryText, setQuoteSummaryText] = useState("");
  const [showEmail, setShowEmail] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { role: "user", content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages, userType: type }),
      });

      if (!res.body) throw new Error("No response body");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let fullText = "";

      const assistantMsg: Message = { role: "assistant", content: "" };
      setMessages((prev) => [...prev, assistantMsg]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        fullText += decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: "assistant", content: fullText };
          return updated;
        });
      }

      const { clean, data } = extractQuote(fullText);
      if (data) {
        setQuoteData(data);
        setQuoteSummaryText(clean);
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: "assistant", content: clean };
          return updated;
        });
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const buildEmailBody = () => {
    if (!quoteData) return "";
    const lines = [
      `TIMBER QUOTE REQUEST`,
      `Species: ${quoteData.species}`,
      `Use: ${quoteData.use}`,
      `Dimensions: ${quoteData.dimensions}`,
      `Quantity: ${quoteData.quantity}`,
      `Dryness: ${quoteData.dryness}`,
      `Grade: ${quoteData.grade}`,
      `Finish: ${quoteData.finish}`,
      quoteData.notes ? `Notes: ${quoteData.notes}` : "",
    ];
    return lines.filter(Boolean).join("\n");
  };

  return (
    <div className="flex flex-col h-screen max-h-screen">
      {/* Header */}
      <div className="bg-forest-900 px-5 py-4 flex items-center justify-between shrink-0 border-b border-forest-700">
        <div>
          <p className="text-timber-300 text-xs tracking-widest uppercase font-medium">Valley Mill</p>
          <h1 className="text-cream font-serif font-bold text-lg leading-tight">Timber Quote</h1>
        </div>
        <span className="text-xs bg-forest-700 text-timber-300 px-3 py-1 rounded-full font-medium">
          {type === "trade" ? "Trade" : "Home project"}
        </span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4">
        {messages.map((msg, i) => {
          const isUser = msg.role === "user";
          return (
            <div key={i} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
              {!isUser && (
                <div className="w-7 h-7 rounded-full bg-timber-500 flex items-center justify-center text-xs shrink-0 mr-2 mt-0.5 font-bold text-cream">
                  V
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                  isUser
                    ? "bg-forest-800 text-cream rounded-tr-sm"
                    : "bg-white border border-timber-100 text-forest-900 rounded-tl-sm"
                }`}
              >
                {isUser ? (
                  <p>{msg.content}</p>
                ) : (
                  <div
                    className="chat-content"
                    dangerouslySetInnerHTML={{
                      __html: `<p>${renderMarkdown(msg.content)}</p>`,
                    }}
                  />
                )}

                {/* Quote summary card inline after last assistant message */}
                {!isUser && quoteData && i === messages.length - 1 && (
                  <QuoteSummary
                    data={quoteData}
                    onEmail={() => setShowEmail(true)}
                  />
                )}
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex justify-start">
            <div className="w-7 h-7 rounded-full bg-timber-500 flex items-center justify-center text-xs shrink-0 mr-2 font-bold text-cream">
              V
            </div>
            <div className="bg-white border border-timber-100 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
              <div className="flex gap-1 items-center h-4">
                <span className="w-1.5 h-1.5 bg-timber-400 rounded-full animate-bounce [animation-delay:0ms]" />
                <span className="w-1.5 h-1.5 bg-timber-400 rounded-full animate-bounce [animation-delay:150ms]" />
                <span className="w-1.5 h-1.5 bg-timber-400 rounded-full animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="shrink-0 border-t border-timber-200 bg-white px-4 py-3">
        <div className="flex gap-2 items-end max-w-3xl mx-auto">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            rows={1}
            placeholder={
              quoteData
                ? "Any changes or questions?"
                : type === "trade"
                ? "e.g. 200×50 DF, 4.8m, green, C16, 40 lengths…"
                : "Describe your project or ask a question…"
            }
            className="flex-1 resize-none border border-timber-300 rounded-xl px-4 py-2.5 text-sm text-forest-900 focus:outline-none focus:border-timber-500 transition-colors placeholder:text-timber-300 max-h-32 leading-relaxed"
            style={{ minHeight: "44px" }}
            onInput={(e) => {
              const el = e.currentTarget;
              el.style.height = "auto";
              el.style.height = Math.min(el.scrollHeight, 128) + "px";
            }}
          />
          <button
            onClick={send}
            disabled={loading || !input.trim()}
            className="bg-forest-800 hover:bg-forest-700 disabled:opacity-40 text-cream rounded-xl px-4 h-11 text-sm font-medium transition-colors shrink-0"
          >
            Send
          </button>
        </div>
        <p className="text-center text-timber-300 text-xs mt-2">
          Press Enter to send · Shift+Enter for new line
        </p>
      </div>

      {showEmail && (
        <EmailModal
          quoteSummary={buildEmailBody()}
          onClose={() => setShowEmail(false)}
        />
      )}
    </div>
  );
}
