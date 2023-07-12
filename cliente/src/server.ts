import express from 'express';
import { env } from './util/config/env';
import Controller from './common/interfaces/controller.interface';
import errorMiddleware from './middleware/errorMiddleware';
import { clientConsumer } from './modules/client/http/user.consumer';






export default class Server {
  private app: express.Application;

  constructor(controllers: Controller[]) {
    this.app = express();

    this.initializeSetup()
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
    this.initializeStreams();

  }


  private initializeSetup() {

    //this.app.use(cors());
    this.app.use(express.json());


  }
  private initializeMiddlewares() {



  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private initializeControllers(controllers: Controller[]) {
    ([...controllers]).forEach((controller) => {
      this.app.use('/', controller.router);
    });
  }

  private initializeStreams() {
    clientConsumer

  }

  public getApp() {
    return this.app;
  }

  public start() {
    this.app.listen(env.port || 3000, () => {
      console.log(`Server is running in port: ${env.port || 3000}`);
    });
  }
}
