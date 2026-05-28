"use client";

import { useState } from "react";

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

const TRAFFIC_CONFIG = {
  green: {
    emoji: "🟢",
    label: "Quote on the spot",
    bg: "bg-green-50",
    border: "border-green-300",
    text: "text-green-800",
  },
  amber: {
    emoji: "🟡",
    label: "Needs price check — 24hr turnaround",
    bg: "bg-amber-50",
    border: "border-amber-300",
    text: "text-amber-800",
  },
  red: {
    emoji: "🔴",
    label: "Flag to Garth/Kev before promising",
    bg: "bg-red-50",
    border: "border-red-300",
    text: "text-red-800",
  },
};

const Row = ({ label, value }: { label: string; value: string }) => {
  if (!value) return null;
  return (
    <div className="flex gap-3 py-2.5 border-b border-timber-100 last:border-0">
      <span className="text-timber-700 text-sm font-medium w-28 shrink-0">{label}</span>
      <span className="text-forest-900 text-sm">{value}</span>
    </div>
  );
};

export default function QuoteSummary({
  data,
  onEmail,
}: {
  data: QuoteData;
  onEmail: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const traffic = TRAFFIC_CONFIG[data.trafficLight] ?? TRAFFIC_CONFIG.amber;

  const summaryText = [
    `TIMBER QUOTE REQUEST`,
    `Species: ${data.species}`,
    `Use: ${data.use}`,
    `Dimensions: ${data.dimensions}`,
    `Quantity: ${data.quantity}`,
    `Dryness: ${data.dryness}`,
    `Grade: ${data.grade}`,
    `Finish: ${data.finish}`,
    data.notes ? `Notes: ${data.notes}` : "",
    `\nStatus: ${traffic.emoji} ${traffic.label}`,
    `Reason: ${data.trafficLightReason}`,
  ]
    .filter(Boolean)
    .join("\n");

  const copy = async () => {
    await navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl border border-timber-300 bg-timber-50 overflow-hidden shadow-sm mt-4">
      {/* Traffic light header */}
      <div className={`px-5 py-3 ${traffic.bg} border-b ${traffic.border} flex items-center gap-2`}>
        <span className="text-lg">{traffic.emoji}</span>
        <div>
          <p className={`font-semibold text-sm ${traffic.text}`}>{traffic.label}</p>
          <p className={`text-xs ${traffic.text} opacity-75`}>{data.trafficLightReason}</p>
        </div>
      </div>

      {/* Spec rows */}
      <div className="px-5 py-2">
        <Row label="Species" value={data.species} />
        <Row label="Use" value={data.use} />
        <Row label="Dimensions" value={data.dimensions} />
        <Row label="Quantity" value={data.quantity} />
        <Row label="Dryness" value={data.dryness} />
        <Row label="Grade" value={data.grade} />
        <Row label="Finish" value={data.finish} />
        <Row label="Notes" value={data.notes} />
      </div>

      {/* Actions */}
      <div className="px-5 py-4 bg-white border-t border-timber-100 flex flex-col sm:flex-row gap-2">
        <button
          onClick={onEmail}
          className="flex-1 bg-forest-800 hover:bg-forest-700 text-cream text-sm font-medium py-2.5 px-4 rounded-xl transition-colors"
        >
          Send to team
        </button>
        <button
          onClick={copy}
          className="flex-1 border border-timber-300 hover:border-timber-500 text-timber-700 text-sm font-medium py-2.5 px-4 rounded-xl transition-colors"
        >
          {copied ? "Copied!" : "Copy spec"}
        </button>
      </div>
    </div>
  );
}
