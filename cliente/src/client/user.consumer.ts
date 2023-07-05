import { prismaClient } from "src/infra/database/prismaClient";
import { IStreamClient, streamClient } from "src/infra/provider/streamClient";



type TCustomerConsumer = {
    customerId: string
    status: string
}

class ClientConsumer {

    constructor(private readonly stream: IStreamClient = streamClient) {
        this.createClient()
    }

    async createClient() {
        const consumer = await this.stream.consumer('ORDER_STATUS')
        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                const messageBody: TCustomerConsumer = JSON.parse(message.value!.toString())
                console.log("Message consumed in topic", topic)
                console.log(messageBody)

                // Enviar mengasem por email
                console.log('ATUALIZAÇÃO DE STATUS- CLIENT-external:', messageBody.customerId)



            }
        })

    }

} 


export const clientConsumer = new ClientConsumer()
