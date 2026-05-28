import Anthropic from "@anthropic-ai/sdk";
import { TIMBER_SYSTEM_PROMPT } from "@/lib/timber-knowledge";

export const runtime = "nodejs";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: Request) {
  const { messages, userType } = await req.json();

  const systemPrompt =
    TIMBER_SYSTEM_PROMPT +
    `\n\nThe current customer has identified themselves as: ${
      userType === "trade"
        ? "a TRADE buyer (professional, knows the jargon — be direct and technical)"
        : "a PROSUMER (enthusiastic DIYer or self-builder — explain things in plain language, be encouraging)"
    }`;

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const anthropicStream = await client.messages.stream({
        model: "claude-sonnet-4-6",
        max_tokens: 1024,
        system: systemPrompt,
        messages,
      });

      for await (const chunk of anthropicStream) {
        if (
          chunk.type === "content_block_delta" &&
          chunk.delta.type === "text_delta"
        ) {
          controller.enqueue(encoder.encode(chunk.delta.text));
        }
      }

      controller.close();
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
