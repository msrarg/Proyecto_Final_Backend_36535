import dotenv from 'dotenv';
dotenv.config();

import CarritosDaoArchivo from './carritos/carritosDaoArchivo.js';
import CarritosDaoMemoria from './carritos/carritosDaoMemoria.js';
import CarritosDaoSQLite from './carritos/carritosDaoSQLite.js';
import CarritosDaoMariaDB from './carritos/carritosDaoMariaDB.js';
import CarritosDaoMongoDB from './carritos/carritosDaoMongoDB.js';
import CarritosDaoFirebase from './carritos/carritosDaoFirebase.js';

import ProductosDaoArchivo from './productos/productosDaoArchivo.js';
import ProductosDaoMemoria from './productos/productosDaoMemoria.js';
import ProductosDaoMariaDB from './productos/productosDaoMariaDB.js';
import ProductosDaoSQLite from './productos/productosDaoSQLite.js';
import ProductosDaoMongoDB from './productos/productosDaoMongoDB.js';
import ProductosDaoFirebase from './productos/productosDaoFirebase.js';

import UsuariosDaoArchivo from './usuarios/usuariosDaoArchivo.js';
import UsuariosDaoMemoria from './usuarios/usuariosDaoMemoria.js';
import UsuariosDaoMariaDB from './usuarios/usuariosDaoMariaDB.js';
import UsuariosDaoSQLite from './usuarios/usuariosDaoSQLite.js';
import UsuariosDaoMongoDB from './usuarios/usuariosDaoMongoDB.js';
import UsuariosDaoFirebase from './usuarios/usuariosDaoFirebase.js';

let productoSelected,carritoSelected,usuarioSelected;


if (process.env.ENGINE == 'MONGODB'){
    productoSelected = ProductosDaoMongoDB;
    carritoSelected = CarritosDaoMongoDB;
    usuarioSelected = UsuariosDaoMongoDB;
}

if (process.env.ENGINE == 'SQLITE'){
    productoSelected = ProductosDaoSQLite;
    carritoSelected = CarritosDaoSQLite;
    usuarioSelected = UsuariosDaoSQLite;
}

if (process.env.ENGINE == 'MARIADB'){
    productoSelected = ProductosDaoMariaDB;
    carritoSelected = CarritosDaoMariaDB;
    usuarioSelected = UsuariosDaoMariaDB;
}

if (process.env.ENGINE == 'FILE'){
    productoSelected = ProductosDaoArchivo;
    carritoSelected = CarritosDaoArchivo;
    usuarioSelected = UsuariosDaoArchivo;
}

if (process.env.ENGINE == 'FIREBASE'){
    productoSelected = ProductosDaoFirebase;
    carritoSelected = CarritosDaoFirebase;
    usuarioSelected = UsuariosDaoFirebase;
}

if (process.env.ENGINE == 'MEMORIA'){
    productoSelected = ProductosDaoMemoria;
    carritoSelected = CarritosDaoMemoria;
    usuarioSelected = UsuariosDaoMemoria;
}


export {
    productoSelected as Producto,
    carritoSelected as Carrito,
    usuarioSelected as Usuario,
}