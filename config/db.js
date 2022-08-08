import dotenv from 'dotenv';
import mongoose from 'mongoose'
import knex from "knex";
import {initializeApp,applicationDefault} from 'firebase-admin/app';
import {getFirestore} from 'firebase-admin/firestore';

dotenv.config();


let knexConnection;
let knexConnectionOptions;
let firebaseConnection;
let store_memoria;
let store_file;

const options_sqlite = {
    client:'sqlite3',
    connection:{
        filename:`./${process.env.DATABASE_DIRECTORY}/${process.env.SQLITE_FILENAME}`
    },
    useNullAsDefault:true,
}

const options_mariadb = {
    client:'mysql',
    connection:{
        host: process.env.MARIADB_HOST || "127.0.0.1",
        user:process.env.MARIADB_USER || "root",
        password:process.env.MARIADB_PASSWORD || "",
        database:process.env.MARIADB_DATABASE || "ecommerce"
    }
}

if (process.env.ENGINE == 'MARIADB'){
    knexConnection = knex(options_mariadb)
    knexConnectionOptions = options_mariadb
}

if (process.env.ENGINE == 'SQLITE'){
    knexConnection = knex(options_sqlite)
    knexConnectionOptions = options_sqlite
}

const mongoConnection = async() =>{
    try{
        await mongoose.connect(process.env.MONGODB_CNN,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
    } catch(e){
        throw new Error(`Error en DB ${e.message}`);
    }
}

const getFirebaseConnection = () => {
    initializeApp({
        credential:applicationDefault()
    })

    const db = getFirestore();
    return db;
};

if (process.env.ENGINE == 'FIREBASE'){
    firebaseConnection = await getFirebaseConnection();
}

if (process.env.ENGINE == 'MEMORIA'){
    store_memoria = {
        productos_memoria:[],
        carritos_memoria:[],
        usuarios_memoria:[]
    }
}

if (process.env.ENGINE == 'FILE'){
    store_file = {
        productos_file : process.env.FILENAME_PRODUCTOS || 'productos.json',
        carritos_file : process.env.FILENAME_CARRITOS || 'carritos.json',
        usuarios_file : process.env.FILENAME_USUARIOS || 'usuarios.json'
    }
}

export {
    knexConnectionOptions,
    knexConnection,
    mongoConnection,
    firebaseConnection,
    store_memoria,
    store_file
}