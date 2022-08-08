import {knexConnection} from "../config/db.js";

class ContenedorDB {

    constructor(table,conn = knexConnection){
        this.conn = conn;
        this.table = table;
    }

    async getById(id) {
        try{
            const item = await this.conn.from(this.table).where({id: id}).select('*').limit(1);
            return item.length === 0 ? null: item;
        }
        catch(error){
            return `Hubo un error "${error}"`
        }
    }

    async getAll() {
        try{
            const all = await this.conn.from(this.table).select('*');
            return all;
        }
        catch(error){
            return `Hubo un error "${error}"`
        }
    }

    async saveContent(item) {
        try{
            const id = await this.conn(this.table).insert(item)
            return id;
        }
        catch(error){
            return `Hubo un error "${error}"`
        }
    }

    async deleteById(id) {
        try{
            const deleted = await this.conn.from(this.table).where({id: id}).del();
            return deleted;
        }
        catch(error){
            return `Hubo un error "${error}"`
        }
    }

    async updateById(id,item) {
        try{
            const updated = await this.conn.from(this.table).where({id: id}).update(item);
            return updated;
        }
        catch(error){
            return `Hubo un error "${error}"`
        }
    }
}

export default ContenedorDB;