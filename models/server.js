require('dotenv').config();

const cors = require('cors');
const express = require('express');
const { mongoConnection } = require('../config/config-db');
class Server {
    constructor(){

        this.app  = express();
        this.port = process.env.PORT;
        this.pathCarrito   = '/api/carrito';
        this.pathProductos = '/api/productos';

        // Database connection
        this.dbConnection();

        // Middlewares
        this.middlewares();

        // Application's Routes
        this.routes();
    }

    async dbConnection(){
        await mongoConnection();
    }

    middlewares(){
        // CORS
        this.app.use(cors());
        // Lectura y parseo del body
        this.app.use(express.json());
        // Directorio publico
        this.app.use(express.static('public'));
        this.app.use(express.urlencoded({ extended: true }));
        // this.app.use(express.urlencoded({ extendedparser : true })); Deprecado
    }

    routes(){
        this.app.use(this.pathCarrito,   require('../routes/carritos.routes'));
        this.app.use(this.pathProductos, require('../routes/productos.routes'));

        // respond with 404 when no matching route is found
        this.app.use('*', (req, res) => {
            const path   = req.originalUrl;
            const method = req.method;
            res.status(404).json({
                    error: -2,
                    descripcion:`La ruta ${path} y/o el método ${method} no se encuentran implementados`
            });
        });
    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log(`Server up on port: ${this.port}`);
        });
    }
}

module.exports = { Server };
