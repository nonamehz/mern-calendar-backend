const express = require('express');
const cors = require('cors');
const path = require('path');
const { dbConnection } = require('../database/config');


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.pathApp = {
            auth: '/api/auth',
            events: '/api/events'
        }

        this.conectarDB();

        this.middlewares();
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {

        this.app.use(cors());
        this.app.use(express.static('public'));
        this.app.use(express.json());

    }

    routes() {
        this.app.use(this.pathApp.auth, require('../routes/auth'));
        this.app.use(this.pathApp.events, require('../routes/events'));

        //exception
        this.app.get('/*', (_req, res) => {
            res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
        });
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on PORT', this.port);
        });
    }

}


module.exports = Server;