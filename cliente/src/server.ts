import express from 'express';
import * as dotenv from 'dotenv';
dotenv.config();


//import errorMiddleware from './middleware/errorMiddleware';

import Controller from './interfaces/controller.interface';
import errorMiddleware from './middleware/errorMiddleware';
import { clientConsumer } from './client/user.consumer';

class Server {
  private app: express.Application;

  constructor(controllers: Controller[]) {
    this.app = express();

    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();

    // initialize services
    clientConsumer 
  }

  private initializeMiddlewares() {
    //this.app.use(cors());
    this.app.use(express.json());
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private initializeControllers(controllers: Controller[]) {
    ([...controllers]).forEach((controller) => {
      this.app.use('/', controller.router);
    });
  }


  public getApp() {
    return this.app;
  }

  public start() {
    this.app.listen(process.env.PORT || 3000, () => {
      console.log(`Server is running in port: ${process.env.PORT || 3000}`);
    });
  }
}

export default Server;