const fs = require('fs').promises
const Product  = require('../models/product');

class Cart {
    constructor(pathFile = './db/carts.json', encoding = 'utf-8'){
        this.pathFile = pathFile;
        this.encoding = encoding;
    }

    async initFile() {
        try {
            await fs.access(this.pathFile);
        }catch(error_access){
            console.log(`Se produjo un error al intentar acceder al archivo ${this.pathFile}. ERROR: ${error_access.message}`);
            try{
                await fs.writeFile(this.pathFile,"[]");
                console.log(`Se creó exitosamente el archivo ${this.pathFile}.`);
            }catch(error_write){
                console.log(`Se produjo un error al intentar crear el archivo ${this.pathFile}. ERROR: ${error_write.message}`);
            }
        }
    }

    async getAllCarts() {
        try{
            const carts = await fs.readFile(this.pathFile, this.encoding);
            const arrayCarts = JSON.parse(carts);
            return arrayCarts.map(carrito => carrito); // devuelve un array de objetos.
        }
        catch(error){
            console.log(`Se produjo un error al leer el archivo en el método getAllCarts(). ERROR: ${error.message}`);
        }
    }
    
    async getCartById(id){
        if(!isNaN(id)){
            try {
              let arrayCarts = await this.getAllCarts();
              if (arrayCarts.length > 0){
                let cart = arrayCarts.find((carrito) => carrito.id === id);
                return typeof cart === 'undefined' ? null : cart; // si no existe el carrito, devuelvo null.
              }
              return null; // Si no hay carritos, devuelvo null.
            } catch (error) {
                console.log(`Se produjo un error al leer el archivo en el método getCartById(). ERROR: ${error.message}`);
            }
          } else {
            throw new Error(`El id: ${id} no es un número.`);            
          }
    }

    async getNextCartId(){
        try{
            const arrayCarts = await this.getAllCarts();
            let maxIndex = Math.max(...arrayCarts.map(cart => cart.id))
            return arrayCarts.length === 0 ? (1) : (maxIndex + 1);
        }
        catch(error){
            console.log(`Se produjo un error en el método getNextCartId. ERROR: ${error.message}`);
        }
    }

    // Crea un carrito y devuelve su id.
    async saveCart() {
        try{        
            let cart = {};
            cart.productos = [];
            cart.timestamp = Date.now();
            cart.id = await this.getNextCartId();
            if(!isNaN(cart.id)){
                let arrayCarts = await this.getAllCarts();
                arrayCarts.push(cart);
                await fs.writeFile(this.pathFile, JSON.stringify(arrayCarts));
                return cart.id;
              } else {
                console.log(`Se produjo un error al intentar calcular el último id en el método saveCart().`);
              }
        }
        catch(error){
            console.log(`Se produjo un error al intentar guardar un carrito en el método saveCart(). ERROR: ${error.message}`);
        }
    }

    async updateCartById(id, cart){
        try{
            const arrayCarts = await this.getAllCarts();
            const index = arrayCarts.findIndex(carrito => carrito.id === id);
            if (index > -1) {
                arrayCarts[index] = cart;
                await fs.writeFile(this.pathFile, JSON.stringify(arrayCarts));
            }else{
                throw new Error(`Id de carrito no encontrado`);
            }
        }
        catch(error){
            return (`Se produjo un error al intentar actualizar el archivo: ${error.message}`);
        }
    }

    // Vacía un carrito y lo elimina.
    async deleteCartById(id){
        try{
            const arrayCarts = await this.getAllCarts();
            const index = arrayCarts.findIndex(carrito => carrito.id === id);
            if (index > -1) {
                arrayCarts.splice(index, 1);
                await fs.writeFile(this.pathFile,JSON.stringify(arrayCarts));        
            }else{
                throw new Error(`Id de carrito no encontrado`);
            }
        }
        catch(error){
            console.log(`Se produjo un error al intentar eliminar un carrito por su id. ERROR: ${error.message}`);
        }
    }

    async deleteAllCarts(){
        try{
            await fs.writeFile(this.pathFile,"[]");
        }
        catch(error){
            console.log(`Se produjo un error al intentar eliminar todos los carritos. ERROR: ${error.message}`);
        }
    }
    
    // Para incorporar productos al carrito por su id de producto
    async saveProductInCart(cart_id, productos){
        try{
            const cart = await this.getCartById(cart_id);
            const product = new Product();
            for(const p of productos){
                const prod = await product.getProductById(p.id);
                if (prod !== null){
                    cart.productos.push(prod);
                }
            }
            await this.updateCartById(cart_id, cart);
        }
        catch(error){
            console.log(`Se produjo un error al intentar actualizar los productos de un carrito: "${error.message}"`);
        }
    }

    // Eliminar un producto del carrito por su id de carrito y de producto
    async deleteProductFromCart(cart_id, product_id){
        const cart = await this.getCartById(cart_id);
        const arrayProducts = cart.productos;
        const index = arrayProducts.findIndex(producto => producto.id === product_id);
        arrayProducts.splice(index, 1);
        cart.productos = arrayProducts;
        await this.updateCartById(cart_id, cart);     
    }
}

module.exports = Cart;
