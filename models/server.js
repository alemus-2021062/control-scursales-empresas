//Importaciones de nodejs
const express = require('express');
const cors = require('cors');
const { dbConection } = require('../database/config');

class Server {

    constructor() {
         this.app = express();
         this.port = process.env.PORT;

        this.paths = {
            sucursal: '/api/sucursal',
            empresa: '/api/empresa',
        }

        this.conectarDB();

        this.middlewares();

        this.routes();
    }

    async conectarDB() {
        await dbConection();
    }

    middlewares() {
        this.app.use(cors());

        this.app.use(express.json());

        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.paths.sucursal, require('../routes/sucursal'));
        this.app.use(this.paths.empresa, require('../routes/empresa'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto ', this.port);
        })
    }
}

module.exports = Server;