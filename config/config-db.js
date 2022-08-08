//import dotenv from 'dotenv';
require('dotenv').config();

// import mongoose from 'mongoose';
const mongoose = require('mongoose');

//import Knex from "Knex";
/*
const knex = require('knex')({
    client: 'sqlite3',
    connection: { filename: './data.db', } ,
  });
*/

// import {initializeApp, applicationDefault} from 'firebase-admin/app';
// import {getFirestore} from 'firebase-admin/firestore';

//dotenv.config();

let knexConnection;
let knexConnectionOptions;
let firebaseConnection;
let store_memoria;
let store_file;

/*
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
    knexConnection = Knex(options_mariadb)
    knexConnectionOptions = options_mariadb
}

if (process.env.ENGINE == 'SQLITE'){
    knexConnection = Knex(options_sqlite)
    knexConnectionOptions = options_sqlite
}
*/

// MongoDB Connection
const mongoConnection = async() =>{
    try{
        await mongoose.connect(process.env.CNN_MONGODB_ATLAS,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useCreateIndex:true,
            useFindAndModify:false
        });
        console.log('Conexión a Mongo Atlas establecida');
    } catch(error) {
        console.log('Error al intentar conectar con Atlas Mongo DB.');
        throw new Error(`Error al intentar conectar con Atlas Mongo DB. ERROR:${error.message}`);
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
        carritos_memoria:[]
    }
}

if (process.env.ENGINE == 'FILE'){
    store_file = {
        productos_file : process.env.FILENAME_PRODUCTOS || 'productos.json',
        carritos_file : process.env.FILENAME_CARRITOS || 'carritos.json'
    }
}

module.exports = { 
    knexConnectionOptions,
    knexConnection,
    mongoConnection,
    firebaseConnection,
    store_memoria,
    store_file
};

/*
export {
    knexConnectionOptions,
    knexConnection,
    mongoConnection,
    firebaseConnection,
    store_memoria,
    store_file
}
*/