const express = require('express')

class Server {
    constructor(){
        this.app  = express()
        this.port = process.env.port || 8080;
        this.pathCarrito   = '/api/carrito';
        this.pathProductos = '/api/productos';
        // this.administrador = false;

        this.middlewares();
        this.routes();
    }
    middlewares(){
        this.app.use(express.json());
        this.app.use(express.static('views'));
        this.app.use(express.urlencoded({ extended: true }));
        // this.app.use(express.urlencoded({ extendedparser : true })); Deprecado
    }

    routes(){
        this.app.use(this.pathCarrito,   require('../routers/carritosRoutes'));
        this.app.use(this.pathProductos, require('../routers/productosRoutes'));

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
            console.log(`Server corriendo en el puerto: ${this.port}`);
        });
    }
}

module.exports = Server;
