import dotenv from 'dotenv';
dotenv.config();

/*
if (!process.env.ENGINE) {
    console.error("**VARIABLES DE ENTONRNO NO DEFINIDAS. UTILIZAR ARCHIVO .env.sample como referencia**");
    return process.exit(1);
}
*/

import {knexConnection,knexConnectionOptions} from "./config/db.js";
import Knex from "Knex";

(async() =>{
    console.log(`Checkeando la estructura para el engine: ${process.env.ENGINE}`);

    if (process.env.ENGINE == 'MARIADB'){
        // Solo se utiliza esta conexion sin la base seleccionada para la creación
        const create_connection = Knex({
            client:knexConnectionOptions.client,
            connection:{
                host: knexConnectionOptions.connection.host,
                user:knexConnectionOptions.connection.user,
                password:knexConnectionOptions.connection.password
            }
        });
        await create_connection.raw('CREATE DATABASE IF NOT EXISTS ??', knexConnectionOptions.connection.database);
        await create_connection.destroy();
    }

    const exists_productos = await knexConnection.schema.hasTable('productos')
    if (!exists_productos) {
        console.log('Se crea la tabla productos')
        await knexConnection.schema.createTable('productos', table => {
            table.increments('id').primary().notNull(),
            table.string('nombre',100).notNull(),
            table.string('descripcion',300).notNull(),
            table.string('codigo',10),
            table.string('foto',500),
            table.float('precio'),
            table.integer('stock'),
            table.bigint('timestamp')
        })
    }

    const exists_carritos = await knexConnection.schema.hasTable('carritos')
    if (!exists_carritos) {

        console.log('Se crea la tabla carritos')
        await knexConnection.schema.createTable('carritos', table => {
            table.increments('id').primary().notNull(),
            table.bigint('timestamp')
        })
    }

    const exists_productos_carrito = await knexConnection.schema.hasTable('productos_carrito')
    if (!exists_productos_carrito) {
        console.log('Se crea la tabla productos_carrito')
        await knexConnection.schema.createTable('productos_carrito', table => {
            table.increments('id').primary().notNull(),
            table.integer('producto_id').unsigned().notNullable(),
            table.integer('carrito_id').unsigned().notNullable();

            table.foreign('producto_id').references('id').inTable('productos').onDelete('CASCADE');
            table.foreign('carrito_id').references('id').inTable('carritos').onDelete('CASCADE');
        }); 
    }
    await knexConnection.destroy();
})();
