import { Suspense } from "react";
import QuotePageClient from "./QuotePageClient";

export default function QuotePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-timber-700">Loading…</div>}>
      <QuotePageClient />
    </Suspense>
  );
}
