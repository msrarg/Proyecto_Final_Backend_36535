import {ContenedorMongoDB} from '../../containers/index.js';
import Producto from '../../models/producto.js';

class ProductosDaoMongoDB extends ContenedorMongoDB {
    constructor() {
        super(Producto);
    }

    async save(item) {
        try{
            item.timestamp = Date.now();
            const id = await this.saveContent(item);
            return id;
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

export default ProductosDaoMongoDB;