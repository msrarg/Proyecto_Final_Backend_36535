import {ContenedorMemoria} from '../../containers/index.js';
import {store_memoria} from "../../config/db.js";

class ProductosDaoMemoria extends ContenedorMemoria {
    constructor() {
        super(store_memoria.productos_memoria);
    }
    async save(producto) {
        try{        
            producto.id = String(await this.__getNextId());
            producto.timestamp = Date.now();
            const productos = await this.getAll();
            productos.push(producto);
            this.items = productos;
            return producto.id;
        }
        catch(error){
            return `Hubo un error "${error}"`
        }
    }

    async addProducts(products){
        try{
            for(const p of products){
                await this.save(p);
            }
        }
        catch(e){
            return `Hubo un error al actualizar el carrito: "${e}"`
        }
    }
}

export default ProductosDaoMemoria;