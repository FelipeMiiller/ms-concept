import { PrismaClient } from "@prisma/client"
import { prismaClient } from "../infra/database/prismaClient"
import { IStreamClient, streamClient } from "src/infra/provider/streamClient"




type CreateClientRequest = {
    name: string,
    email: string,
    password: string
    phone: string
}

interface IClient extends CreateClientRequest {
    id: string
}

export interface IClientService {

    create(data: CreateClientRequest): Promise<IClient>
}

export class ClientService implements IClientService {


    constructor(
        private prisma: PrismaClient = prismaClient,
        private stream: IStreamClient = streamClient
    ) { }

    async create(data: CreateClientRequest): Promise<IClient> {

        const client = await this.prisma.client.findFirst({
            where: {
                email: data.email
            }
        })

        if (client) throw new Error("Costumer already exists")

        const clientCreated = await this.prisma.client.create({
            data: { ...data }
        })

        await this.stream.producer('ORDER_NOTIFICATION', { id: clientCreated.id, email: clientCreated.email })

        return clientCreated
    }
}