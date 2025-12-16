"use strict";

// Simple WebSocket server that integrates with Redis pub/sub and Kafka producer
// Usage: node scripts/ws-server.js

const WebSocket = require("ws");
const { redisSubscriber, publishChannel } = require("../lib/redis");
const { producer, connectProducer, sendKafkaMessage } = require("../lib/kafka");

const port = process.env.WS_PORT || 8080;

async function start() {
  // Connect Kafka producer
  try {
    await connectProducer();
    console.log("Kafka producer connected");
  } catch (err) {
    console.warn(
      "Kafka producer failed to connect, continuing (Kafka optional during dev):",
      err
    );
  }

  const wss = new WebSocket.Server({ port });
  console.log(`WebSocket server listening on ws://localhost:${port}`);

  // Broadcast messages received on Redis channel to connected clients
  redisSubscriber.subscribe("broadcast", (err, count) => {
    if (err) {
      console.error("Redis subscribe error:", err);
    } else {
      console.log("Subscribed to Redis channel: broadcast");
    }
  });

  redisSubscriber.on("message", (channel, message) => {
    if (channel !== "broadcast") return;
    try {
      const payload = JSON.parse(message);
      const raw = JSON.stringify(payload);
      // broadcast to all ws clients
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(raw);
        }
      });
    } catch (err) {
      console.error("Error parsing Redis message:", err);
    }
  });

  wss.on("connection", (ws) => {
    ws.on("message", async (msg) => {
      try {
        const data = JSON.parse(msg.toString());
        // publish to redis channel so other server instances can broadcast
        await publishChannel("broadcast", data);
        // also send to kafka for analytics/streaming
        await sendKafkaMessage("messages", data);
      } catch (err) {
        console.error("Error handling incoming WS message:", err);
      }
    });

    ws.send(JSON.stringify({ type: "welcome", now: Date.now() }));
  });
}

start().catch((err) => console.error(err));
