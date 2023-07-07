

import { Consumer, Kafka, KafkaConfig } from "kafkajs"
import { env } from "src/config/env"
import { StreamException } from "src/exceptions/HttpExceptions"




export interface IStreamClient {
    producer<T>(topic: string, payload: T): Promise<void>
    consumer(topic: string): Promise<Consumer>
}


class StreamClient implements IStreamClient {
    private streamer: Kafka

    constructor(config?: KafkaConfig) {
        this.streamer = this.initialize(config)

    }


    initialize(config?: KafkaConfig): Kafka {

        return new Kafka({
            brokers: [env.kafka.broker],
            sasl: {
                mechanism: "scram-sha-256",
                username: env.kafka.username,
                password: env.kafka.password,
            },
            ssl: true,

        } || config)
    }


    async producer<T>(topic: string, payload: T): Promise<void> {
        try {

            const producer = this.streamer.producer({
                allowAutoTopicCreation: true,
            })


            await producer.connect()
            console.log(payload)
            await producer.send({
                topic,
                messages: [
                    {
                        value: JSON.stringify(payload)
                    }
                ]
            })

            console.log("Message sent to topic", topic)
            console.log(payload)
            await producer.disconnect()


        } catch (error) {

            throw new StreamException("Producer error", 500)
        }
    }


    async consumer(topic: string): Promise<Consumer> {
        try {
            const received = this.streamer.consumer({ groupId: "CLIENT_APP" });
            await received.connect();
            await received.subscribe({ topic, fromBeginning: true })
            return received;
        } catch (error) {
            throw new StreamException("Consumer error", 500)
        }
    }

}

export const streamClient = new StreamClient()




