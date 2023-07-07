

import { ClientController } from './client/client.controller';
import Server from './server';
import 'dotenv/config'
const app = new Server([
    new ClientController()

]);


app.start();
