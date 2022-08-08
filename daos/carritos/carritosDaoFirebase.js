import { ContenedorFirebase } from '../../containers/index.js';
import ProductosDaoFirebase from '../productos/productosDaoFirebase.js';

class CarritosDaoFirebase extends ContenedorFirebase {
    constructor() {
        super('carritos');
    }
        async save() {
        try{
            let carrito = {};
            carrito.timestamp = Date.now();

            const id= await this.saveContent(carrito);
            return id;
        }
        catch(error){
            return `Hubo un error "${error}"`
        }
    }

    async addProductsCart(products, cart_id){
        try{
            const producto = new ProductosDaoFirebase();
            const carrito = await this.getById(cart_id);
            const productos = carrito.productos?? [];
            for(const p of products){
                const encontrado = productos.findIndex(x => (x.id === p.id));
                if (encontrado < 0){
                    const prod = await producto.getById(p.id);
                    productos.push(prod);
                }
            }
            await this.updateById(cart_id,{productos})
        }
        catch(e){
            return `Hubo un error al actualizar el carrito: "${e}"`
        }
    }

    async getProductsCart(cart_id){
        try{
            const carrito = await this.getById(cart_id);
            const productos = carrito.productos?? [];
            return productos;
        }
        catch(e){
            return `Hubo un error al actualizar el carrito: "${e}"`
        }
    }

    async deleteProductCart(product_id, cart_id){
        const carrito = await this.getById(cart_id);
        let productos = carrito.productos;
        const index = productos.findIndex(p => p.id === product_id);
        productos.splice(index, 1);
        await this.updateById(cart_id,{productos})

    }
}

export default CarritosDaoFirebase;