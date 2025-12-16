import { Kafka, logLevel } from "kafkajs";

const brokers = (process.env.KAFKA_BROKERS || "localhost:9092").split(",");
const clientId = process.env.KAFKA_CLIENT_ID || "playground-app";

const kafka = new Kafka({ clientId, brokers, logLevel: logLevel.INFO });
export const producer = kafka.producer();
export const consumer = kafka.consumer({ groupId: `${clientId}-group` });

export async function connectProducer() {
  try {
    await producer.connect();
  } catch (err) {
    console.error("Kafka producer connect error:", err);
  }
}

export async function sendKafkaMessage(topic: string, value: unknown) {
  try {
    // ensure connected in case the process hasn't connected yet
    if (!producer) await connectProducer();
    await producer.send({
      topic,
      messages: [
        { value: typeof value === "string" ? value : JSON.stringify(value) },
      ],
    });
  } catch (err) {
    console.error("Kafka send error:", err);
  }
}
