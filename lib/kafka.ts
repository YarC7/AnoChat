import { Kafka, logLevel, Partitioners } from "kafkajs";

const brokers = (process.env.KAFKA_BROKERS || "localhost:9092").split(",");
const clientId = process.env.KAFKA_CLIENT_ID || "playground-app";

const kafka = new Kafka({ clientId, brokers, logLevel: logLevel.INFO });
// Use the legacy partitioner to retain previous partitioning behavior and silence the migration warning.
// See: https://kafka.js.org/docs/migration-guide-v2.0.0#producer-new-default-partitioner
export const producer = kafka.producer({
  createPartitioner: Partitioners.LegacyPartitioner,
});
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
