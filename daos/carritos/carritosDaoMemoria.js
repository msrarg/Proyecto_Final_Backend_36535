import {Producto} from '../../daos/index.js';
import {ContenedorMemoria} from '../../containers/index.js';
import {store_memoria} from "../../config/db.js";

class CarritosDaoMemoria extends ContenedorMemoria {
    constructor() {
        super(store_memoria.carritos_memoria);
    }

    async save() {
        try{
            let carrito = {};
            carrito.id = String(await this.__getNextId());
            carrito.timestamp = Date.now();
            const carritos = await this.getAll();
            carrito.productos = [];
            carritos.push(carrito);
            this.items = carritos;
            return carrito.id;
        }
        catch(error){
            return `Hubo un error "${error}"`
        }
    }

    async addProductsCart(products, cart_id){
        try{
            const carrito = await this.getById(cart_id);
            const producto = new Producto();
            for(const p of products){
                const prod = await producto.getById(p.id);
                if (prod !== null){
                    carrito.productos.push(prod);
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

        this.updateById(cart_id, carrito);
    }
}

export default CarritosDaoMemoria;