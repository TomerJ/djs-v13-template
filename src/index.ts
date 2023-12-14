require('dotenv').config();
import { ExtendedClient } from './classes/client';

export const client = new ExtendedClient();
client.start();
