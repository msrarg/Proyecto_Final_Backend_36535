import {firebaseConnection} from "../config/db.js";

class ContenedorFirebase {

    constructor(table,conn = firebaseConnection) {
        this.table = table;
        this.conn = conn;
    }

    async getById(id) {
        try{
            const doc = this.conn.collection(this.table).doc(`${id}`)
            const item = await doc.get()	
            if (typeof item.data() === 'undefined') return null;

            let document = item.data();
            document.id = item.id
            return document;                
        }
        catch(error){
            return `Hubo un error "${error}"`
        }
    }

    async getAll() {
        try{
            const querySnapshot = await this.conn.collection(this.table).get()
            const docs = querySnapshot.docs
            const output = [];
            docs.forEach(doc => {
                let document = doc.data();
                document.id = doc.id
                output.push(document);
            });
            
            return output;
        }
        catch(error){
            return `Hubo un error "${error}"`
        }
    }

    async saveContent(item) {
        try{
            const {id,...resto} = item;
            const added = await this.conn.collection(this.table).add(resto)
            return added.id;
        }
        catch(error){
            return `Hubo un error "${error}"`
        }
    }

    async deleteById(id) {
        try{
            const doc = this.conn.collection(this.table).doc(`${id}`)
            const deleted = await doc.delete()
            return deleted;
        }
        catch(error){
            return `Hubo un error "${error}"`
        }
    }

    async updateById(id_update,item) {
        const {id,...resto} = item;
        try{
            const doc = this.conn.collection(this.table).doc(`${id_update}`)
            let updated = await doc.update(resto)
            return updated;
        }
        catch(error){
            return `Hubo un error "${error}"`
        }
    }
}

export default ContenedorFirebase;