require('dotenv').config();
const Server = require('./models/Server');
const { dbConnection } = require('./database/config');


const server = new Server();

server.listen();