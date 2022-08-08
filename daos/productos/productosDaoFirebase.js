import {ContenedorFirebase} from '../../containers/index.js';

class ProductosDaoFirebase extends ContenedorFirebase {
    constructor() {
        super('productos');
    }

    async addProducts(products){
        try{
            for(const p of products){
                await this.saveContent(p);
            }
        }
        catch(e){
            return `Hubo un error al actualizar el carrito: "${e}"`
        }
    }
}

export default ProductosDaoFirebase;