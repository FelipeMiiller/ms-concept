import express, { Request, Response } from "express";
import { ClientService} from "../domain/client.service";

import { createClientSchema } from "../domain/dto/createClientSchema";
import validate from "src/middleware/validate";
import HttpException from "src/util/exceptions/HttpExceptions";



export class ClientController {
    public path = '/clients';
    public router = express.Router();


    constructor() {

        this.initializeRoutes();
    }

    public initializeRoutes() {

        this.router.post(this.path, validate(createClientSchema), this.create)
    }

    async create(req: Request, res: Response) {


        try {
            const client = await new ClientService().create(req.body);
            res.status(201).send(client);
        } catch (error) {

            if (error instanceof HttpException) {
                res.status(500).send({ status: error.status, name: error.name, message: error.message });
            } else {
                res.status(500).send("Unexpected error");
            }
        }
    }
}