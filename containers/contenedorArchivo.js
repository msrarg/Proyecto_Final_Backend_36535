import { promises as fs } from 'fs';


class ContenedorArchivo {
    constructor(filename){
        this.filename = `./${process.env.DATABASE_DIRECTORY}/${filename}`;
    }

    async getAll() {
        try{
            const info = await fs.readFile(this.filename,'utf-8')
            const data = JSON.parse(info);
            return data.map(p => p);
        }
        catch(error){
            return `Hubo un error "${error}"`
        }
    }

    async getById(id){
        try{
            if (typeof id === 'undefined') {
                throw new Error(`Debe completar el id`);
            }

            const items = await this.getAll();
            const item = items.find(p => p.id === id);
            return typeof item === 'undefined' ? null: item;
        }
        catch(e){
            return `Hubo un error "${e.message}"`
        }
    }
    async deleteById(id){
        try{
            if (typeof id === 'undefined') {
                throw new Error(`Debe completar el id`);
            }

            const items = await this.getAll();
            const index = items.findIndex(p => {return p.id === id;});

            //Por si no existe el producto
            if (index > -1){
                let items = await this.getAll();
                items.splice(index, 1);
                await this.__saveContent(items);
            }
        }
        catch(e){
            return `Hubo un error "${e.message}"`
        }

    }

    async updateById(id, cart){
        try{
            const items = await this.getAll();
            const index = items.findIndex(p => p.id === id);

            cart.id = id;
            items[index] = cart;
            await this.__saveContent(items);
        }
        catch(e){
            return `Hubo un error "${e.message}"`
        }
    }

    async deleteAll(){
        try{
            await this.__saveContent("[]");
        }
        catch(e){
            return `Hubo un error "${e}"`
        }
    }

    async __getNextId(){
        try{
            const items = await this.getAll();
            const ids = items.map(p => (p.id) );
            
            return ids.length === 0 ? 1 : Math.max(...ids) + 1;
        }
        catch(e){
            return `Hubo un error "${e}"`
        }
    }

    async __saveContent(content){
        await fs.writeFile(this.filename,JSON.stringify(content));
    }

}

export default ContenedorArchivo;
