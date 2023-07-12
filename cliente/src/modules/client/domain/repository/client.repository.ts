
import { PrismaClient } from '@prisma/client';
import { prismaClient } from '../../../../common/infra/database/prismaClient';
import { DBException } from '../../../../util/exceptions/HttpExceptions';








export type IClient = {
    id: string
    name: string,
    email: string,
    password: string
    phone: string
}


export interface IClientRepository {
    create(data: Omit<IClient,'id'>): Promise<IClient>;
    findById(id: string): Promise<IClient>;
    findByEmail(email: string): Promise<IClient>;
    update(id: string, data: Partial<IClient>): Promise<IClient>;
    delete(id: string): Promise<void>;
}

export class ClientRepository implements IClientRepository {

    constructor(private prisma: PrismaClient = prismaClient) {

    }

    async create(data: Omit<IClient, 'id'>): Promise<IClient> {
        try {
            const client = await this.prisma.client.findFirst({
                where: {
                    email: data.email
                }
            })

            if (client) throw new Error(`Client with email ${data.email} exists`)

            return await this.prisma.client.create({ data });

        } catch (error) {

            if (error instanceof Error) {

                throw new DBException(`Failed to create client: ${error.message}`, 400);
            }
            throw new DBException('Failed to create client,unknown error !!!', 400);
        }
    }

    async findById(id: string): Promise<IClient> {
        try {
            const client = await this.prisma.client.findUnique({ where: { id } });
            if (!client) {
                throw new Error(`Client with ID ${id} not found`);
            }
            return client;
        } catch (error) {
            if (error instanceof Error) {
                throw new DBException(`Failed to find client by ID: ${error.message}`, 400);
            }
            throw new DBException('Failed to find client by ID,unknown error !!!', 400);
        }
    }

    async findByEmail(email: string): Promise<IClient> {
        try {
            const client = await this.prisma.client.findUnique({ where: { email } });
            if (!client) {
                throw new Error(`Client with email ${email} not found`);
            }
            return client;
        } catch (error) {
            if (error instanceof Error) {
                throw new DBException(`Failed to find client by email: ${error.message}`, 400);
            }
            throw new DBException('Failed to find client by email,unknown error !!!', 400);
        }
    }

    async update(id: string, data: Partial<IClient>): Promise<IClient> {
        try {
            const client = await this.prisma.client.update({ where: { id }, data });
            if (!client) {
                throw new Error(`Client with ID ${id} not found`);
            }
            return client;
        } catch (error) {
            if (error instanceof Error) {
                throw new DBException(`Failed to update client: ${error.message}`, 400);
            }
            throw new DBException('Failed to update client,unknown error !!!', 400);
        }
    }

    async delete(id: string): Promise<void> {
        try {
            const client = await this.prisma.client.delete({ where: { id } });
            if (!client) {
                throw new Error(`Client with ID ${id} not found`);
            }
        } catch (error) {
            if (error instanceof Error) {
                throw new DBException(`Failed to delete client: ${error.message}`, 400);
            }
            throw new DBException('Failed to delete client,unknown error !!!', 400);
        }
    }


    async deleteAll(): Promise<void> {
        try {
            const client = await this.prisma.client.deleteMany({})


            if (!client) {
                throw new Error(`Deleted all clients`);
            }
        } catch (error) {
            if (error instanceof Error) {
                throw new DBException(`Failed to delete all clients: ${error.message}`, 400);
            }
            throw new DBException('Failed to delete all clients,unknown error !!!', 400);
        }
    }
}

export const clientRepository = new ClientRepository();