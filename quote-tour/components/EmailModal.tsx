"use client";

import { useState } from "react";

interface EmailModalProps {
  quoteSummary: string;
  onClose: () => void;
}

export default function EmailModal({ quoteSummary, onClose }: EmailModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    const subject = encodeURIComponent("Timber Quote Request");
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\n${quoteSummary}`
    );

    // Opens the user's email client with the quote pre-filled.
    // Replace the mailto address with your team's actual email.
    window.open(`mailto:quotes@valleymill.co.uk?subject=${subject}&body=${body}`);

    setSending(false);
    setSent(true);
  };

  if (sent) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-cream rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl">
          <div className="text-5xl mb-4">✅</div>
          <h2 className="font-serif text-xl font-bold text-forest-900 mb-2">Your email app is open</h2>
          <p className="text-timber-700 text-sm mb-6">
            The quote spec has been loaded into your email. Hit send and we'll be in touch within 24 hours.
          </p>
          <button
            onClick={onClose}
            className="w-full bg-forest-800 text-cream py-2.5 rounded-xl text-sm font-medium hover:bg-forest-700 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div
        className="bg-cream rounded-2xl p-6 max-w-sm w-full shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="font-serif text-xl font-bold text-forest-900 mb-1">Send quote to the team</h2>
        <p className="text-timber-700 text-sm mb-5">We'll come back to you within 24 hours with pricing.</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            required
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-timber-300 rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:border-timber-500 transition-colors"
          />
          <input
            required
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-timber-300 rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:border-timber-500 transition-colors"
          />
          <input
            type="tel"
            placeholder="Phone (optional)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border border-timber-300 rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:border-timber-500 transition-colors"
          />

          <div className="flex gap-2 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-timber-300 text-timber-700 py-2.5 rounded-xl text-sm font-medium hover:border-timber-500 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={sending}
              className="flex-1 bg-forest-800 text-cream py-2.5 rounded-xl text-sm font-medium hover:bg-forest-700 transition-colors disabled:opacity-60"
            >
              {sending ? "Opening…" : "Send quote"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
