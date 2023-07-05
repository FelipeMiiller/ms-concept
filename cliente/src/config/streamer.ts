import { KafkaConfig } from "kafkajs";




export const config_Kafka: KafkaConfig = {
    brokers: [process.env.KAFKA_BROKER as string],
    sasl: {
        mechanism: "scram-sha-256",
        username: process.env.KAFKA_USERNAME as string,
        password: process.env.KAFKA_PASSWORD as string,
    },
    ssl: true,

}