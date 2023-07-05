

import { Consumer, Kafka, KafkaConfig } from "kafkajs"
import { config_Kafka } from "src/config/streamer"

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

        return new Kafka(config_Kafka || config)
    }


    async producer<T>(topic: string, payload: T): Promise<void> {

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
    }


    async consumer(topic: string): Promise<Consumer> {

        const received = this.streamer.consumer({ groupId: "CLIENT_APP" });
        await received.connect();
        await received.subscribe({ topic, fromBeginning: true })
        return received;

    }

}

export const streamClient = new StreamClient()




