
class ContenedorMemoria {
    constructor(items){
        this.items = items;
    }

    async getAll() {
        try{
            return this.items;
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
            const index = this.items.findIndex(p => {return p.id === id;});

            //Por si no existe el producto
            if (index > -1){
                let items = this.items;
                items.splice(index, 1);
                this.items = items;
            }
        }
        catch(e){
            return `Hubo un error "${e.message}"`
        }

    }

    async updateById(id, cart){
        try{
            const items = await this.getAll();
            const index = items.findIndex(p => {return p.id === id;});

            cart.id = id;
            items[index] = cart;
            this.items = items;
        }
        catch(e){
            return `Hubo un error "${e.message}"`
        }
    }

    async deleteAll(){
        try{
            this.items = [];
        }
        catch(e){
            return `Hubo un error "${e}"`
        }
    }

    async __getNextId(){
        try{
            const items = await this.getAll();
            const ids = this.items.map(p => (p.id) );
            
            return ids.length === 0 ? 1 : Math.max(...ids) + 1;
        }
        catch(e){
            return `Hubo un error "${e}"`
        }
    }
}

export default ContenedorMemoria;
