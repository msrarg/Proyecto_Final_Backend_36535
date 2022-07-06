const Server = require('./models/server');

global.ADMIN = true;

const server = new Server();
server.listen();