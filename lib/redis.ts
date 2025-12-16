import IORedis from "ioredis";

const redisUrl = process.env.REDIS_URL || "redis://127.0.0.1:6379";

export const redis = new IORedis(redisUrl);
export const redisSubscriber = redis.duplicate();
export const redisPublisher = redis;

// helper: publish a JSON message to a channel
export async function publishChannel(channel: string, payload: unknown) {
  try {
    await redisPublisher.publish(channel, JSON.stringify(payload));
  } catch (err) {
    console.error("Redis publish error:", err);
  }
}
