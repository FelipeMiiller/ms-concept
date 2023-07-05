

import { ClientController } from './client/client.controller';
import Server from './server';

const app = new Server([
    new ClientController()

]);


app.start();
