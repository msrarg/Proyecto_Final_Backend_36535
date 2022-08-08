import { ContenedorDB } from '../../containers/index.js';

class CarritosDaoSQLite extends ContenedorDB {
    constructor() {
        super('carritos');
    }
    async save() {
        try{
            let carrito = {};
            carrito.timestamp = Date.now();
            const [id] = await this.saveContent(carrito);
            return id;
        }
        catch(error){
            return `Hubo un error "${error}"`
        }
    }

    async addProductsCart(products, cart_id){
        try{
            const producto_carrito = new ContenedorDB('productos_carrito');

            for(const p of products){
                const productos = await this.getProductsCart(cart_id);
                // Esto para evitar que meta el mismo producto varias veces
                const encontrado = productos.findIndex(x => (x.id === parseInt(p.id)));
                if (encontrado < 0){
                    producto_carrito.saveContent({
                        producto_id:p.id,
                        carrito_id:cart_id
                    });
                }
            }
        }
        catch(e){
            return `Hubo un error al actualizar el carrito: "${e}"`
        }
    }

    async getProductsCart(cart_id){
        try{
            const productos = await this.conn.select('productos.*')
            .from('productos_carrito')
            .join('productos', 'productos.id', 'productos_carrito.producto_id')
            .where({carrito_id: cart_id});
            return productos;
        }
        catch(e){
            return `Hubo un error al actualizar el carrito: "${e}"`
        }
    }

    async deleteProductCart(product_id, cart_id){
        await this.conn.from('productos_carrito').where({carrito_id: cart_id,producto_id: product_id}).del();
    }
}

export default CarritosDaoSQLite;