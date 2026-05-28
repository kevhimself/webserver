"use client";

import { useSearchParams } from "next/navigation";
import ChatInterface from "@/components/ChatInterface";

export default function QuotePageClient() {
  const params = useSearchParams();
  const userType = params.get("type") ?? "prosumer";
  return <ChatInterface userType={userType} />;
}
