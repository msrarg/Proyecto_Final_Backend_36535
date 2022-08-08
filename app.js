import dotenv from 'dotenv';
dotenv.config();
import Server from './models/server.js';

//Variable administrador definida temporamente
global.ADMINISTRADOR = true;

const server = new Server();
server.start();