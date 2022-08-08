import {ContenedorMongoDB} from '../../containers/index.js';
import Carrito from '../../models/carrito.js';
import ProductosDaoMongoDB from '../productos/productosDaoMongoDB.js';


class CarritosDaoMongoDB extends ContenedorMongoDB {
    constructor() {
        super(Carrito);
    }
    async save() {
        try{
            let carrito = {};
            carrito.timestamp = Date.now();
            const nuevo_carrito = await this.saveContent(carrito);
            return nuevo_carrito.id;
        }
        catch(error){
            return `Hubo un error "${error}"`
        }
    }

    async addProductsCart(products, cart_id){
        try{
            const producto = new ProductosDaoMongoDB();
         
            for(const p of products){
                const carrito = await this.getById(cart_id);
                const indiceCarritoProducto = carrito.productos.findIndex(x => (x.producto.valueOf() === p.id));

                if (indiceCarritoProducto < 0){
                    const prod = await producto.getById(p.id);
                    carrito.productos.push({
                        producto:prod,
                        cantidad:1
                    });
                } else {
                    carrito.productos[indiceCarritoProducto].cantidad += 1;
                }

                await this.updateById(cart_id, carrito);
                
            }
        }
        catch(e){
            return `Hubo un error al actualizar el carrito: "${e}"`
        }
    }

    async getProductsCart(cart_id){
        try{
            const carrito = await this.getById(cart_id);
            const producto = new ProductosDaoMongoDB();
            const output = [];
            for(const p of carrito.productos){
                let {__v,_id, ...prod_carrito} = await producto.getById(p.producto,true)
                prod_carrito.cantidad = p.cantidad;
                prod_carrito.total = p.cantidad * prod_carrito.precio;
                prod_carrito.id = _id;
                output.push( prod_carrito );
            }
            return output;
        }
        catch(e){
            return `Hubo un error al actualizar el carrito: "${e}"`
        }
    }

    async deleteProductCart(product_id, cart_id){
        const carrito = await this.getById(cart_id);
        const indiceCarritoProducto = carrito.productos.findIndex(x => (x.producto.valueOf() === product_id));

        if (carrito.productos[indiceCarritoProducto].cantidad === 1){
            carrito.productos.splice(indiceCarritoProducto,1);
        } else {
            carrito.productos[indiceCarritoProducto].cantidad -= 1;
        }
        await carrito.save();
    }
}

export default CarritosDaoMongoDB;