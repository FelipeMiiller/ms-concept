import express, { Request, Response } from "express";
import { ClientService, IClientService } from "./client.service";
import validate from "src/validation";
import { createClientSchema } from "src/validation/client/createClientSchema";





export class ClientController {
    public path = '/clients';
    public router = express.Router();


    constructor(private readonly clientService: IClientService = new ClientService()) {
        this.initializeRoutes();
    }

    public initializeRoutes() {

        this.router.post(this.path, validate(createClientSchema), this.createClient)
    }

    async createClient(req: Request, res: Response) {


        try {
            const client = await this.clientService.create(req.body);
            res.status(201).send(client);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json(error.message);
            } else {
                res.status(500).json("Unexpected error");
            }
        }
    }
}