import {Producto} from '../../daos/index.js';
import {ContenedorArchivo} from '../../containers/index.js';
import {store_file} from "../../config/db.js";


class CarritosDaoArchivo extends ContenedorArchivo {
    constructor() {
        super(store_file.carritos_file);
    }

    async save() {
        try{
            let carrito = {};
            carrito.id = String(await this.__getNextId());
            carrito.timestamp = Date.now();
            const carritos = await this.getAll();
            carrito.productos = [];
            carritos.push(carrito);
            await this.__saveContent(carritos);
            return carrito.id;
        }
        catch(error){
            return `Hubo un error "${error}"`
        }
    }

    async addProductsCart(products, cart_id){
        try{
            
            const producto = new Producto();
            const carrito = await this.getById(cart_id);
            for(const p of products){

                const encontrado = carrito.productos.findIndex(x => (x.id === p.id));
                if (encontrado < 0){
                    const prod = await producto.getById(p.id);
                    if (prod !== null){
                        carrito.productos.push(prod);
                    }
                }

            }
            await this.updateById(cart_id, carrito);
            
        }
        catch(e){
            return `Hubo un error al actualizar el carrito: "${e}"`
        }
    }

    async getProductsCart(cart_id){
        try{
            const carrito = await this.getById(cart_id);
            return carrito.productos;
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
        carrito.productos = productos;

        await this.updateById(cart_id, carrito);
    }
}

export default CarritosDaoArchivo;
