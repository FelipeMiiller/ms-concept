import { IStreamClient, streamClient } from "src/common/infra/provider/streamClient";



type TClientConsumer = {
    customerId: string
    status: string
}

class ClientConsumer {

    constructor(private readonly stream: IStreamClient = streamClient) {
        this.initialize()
      
    }


      initialize() {
        this.createClient()
    }

    async createClient() {
        const consumer = await this.stream.consumer('ORDER_STATUS')
        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                const messageBody: TClientConsumer = JSON.parse(message.value!.toString())
                console.log("Message client in topic", topic)
                console.log(messageBody)

                // Enviar mengasem por email
                console.log('Status update:', messageBody.customerId)
            }
        })
    }
} 

export const clientConsumer = new ClientConsumer()
