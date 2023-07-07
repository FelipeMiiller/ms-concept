
import { IStreamClient, streamClient } from "src/infra/provider/streamClient"
import { IClient, IClientRepository, clientRepository as ClientRepository } from "./client.repository"


export class ClientService {


    constructor(
        private clientRepository: IClientRepository = ClientRepository,
        private stream: IStreamClient = streamClient
    ) { }

    async create(data: Omit<IClient, 'id'>): Promise<IClient> {
        const clientCreated = await this.clientRepository.create(data)
        await this.stream.producer('ORDER_NOTIFICATION', { id: clientCreated.id, email: clientCreated.email })

        return clientCreated

    }
}