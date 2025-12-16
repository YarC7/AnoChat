import { NextResponse } from "next/server";
import { publishChannel } from "@/lib/redis";
import { sendKafkaMessage, connectProducer } from "@/lib/kafka";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message } = body;

    if (!message) {
      return NextResponse.json({ error: "Missing message" }, { status: 400 });
    }

    // publish via Redis so WS servers can broadcast
    await publishChannel("broadcast", {
      type: "message",
      payload: message,
      ts: Date.now(),
    });

    // send to Kafka as well (topic: messages)
    await connectProducer();
    await sendKafkaMessage("messages", { message, ts: Date.now() });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error in messages API:", err);
    return NextResponse.json(
      { error: "Failed to publish message" },
      { status: 500 }
    );
  }
}
