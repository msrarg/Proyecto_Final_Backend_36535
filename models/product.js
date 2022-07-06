const fs = require('fs').promises;

class Product {
    constructor(pathFile = './db/products.json', encoding = 'utf-8'){
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

    async getAllProducts() {
        try{
            const products = await fs.readFile(this.pathFile, this.encoding);
            const arrayProducts = JSON.parse(products);
            return arrayProducts.map(producto => producto); // devuelve un array de objetos.
        }
        catch(error){
            console.log(`Se produjo un error al leer el archivo en el método getAllProducts(). ERROR: ${error.message}`);
        }
    }

    async getProductById(id){
        if(!isNaN(id)){
            try {
              let arrayProducts = await this.getAllProducts();
              if (arrayProducts.length > 0){
                let product = arrayProducts.find((producto) => producto.id === id);
                return typeof product === 'undefined' ? null : product; // si no existe el producto, devuelve null.
              }
              return null; // Si no hay productos, devuelve null.
            } catch (error) {
                console.log(`Se produjo un error al leer el archivo en el método getProductById(). ERROR: ${error.message}`);
            }
          } else {
            throw new Error(`El id: ${id} no es un número.`);            
          }
    }

    async getNextProductId(){
        try{
            const arrayProducts = await this.getAllProducts();
            let maxIndex = Math.max(...arrayProducts.map(producto => producto.id))
            return arrayProducts.length === 0 ? (1) : (maxIndex + 1);
        }
        catch(error){
            console.log(`Se produjo un error en el método getNextProductId. ERROR: ${error.message}`);
        }
    }

    async saveProduct(product) {
        try{        
            product.timestamp = Date.now();
            product.id = await this.getNextProductId();
            if(!isNaN(product.id)){
                let arrayProducts = await this.getAllProducts();
                arrayProducts.push(product);
                await fs.writeFile(this.pathFile, JSON.stringify(arrayProducts));
                return product.id;
              } else {
                console.log(`Se produjo un error al intentar calcular el último id en el método saveProduct().`);
              }
        }
        catch(error){
            console.log(`Se produjo un error al intentar guardar un producto en el método saveProduct(). ERROR: ${error.message}`);
        }
    }

    async updateProductById(id, product){
        try{
            const arrayProducts = await this.getAllProducts();
            const index = arrayProducts.findIndex(producto => producto.id === id);
            if (index > -1) {
                arrayProducts[index] = product;
                await fs.writeFile(this.pathFile, JSON.stringify(arrayProducts));
            }else{
                throw new Error(`Id de producto no encontrado`);
            }
        }
        catch(error){
            return (`Se produjo un error al intentar actualizar el archivo: ${error.message}`);
        }
    }

    async deleteProductById(id){
        try{
            const arrayProducts = await this.getAllProducts();
            const index = arrayProducts.findIndex(producto => producto.id === id);
            if (index > -1) {
                arrayProducts.splice(index, 1);
                await fs.writeFile(this.pathFile,JSON.stringify(arrayProducts));        
            }else{
                throw new Error(`Id de producto no encontrado`);
            }
        }
        catch(error){
            console.log(`Se produjo un error al intentar eliminar un producto por su id. ERROR: ${error.message}`);
        }
    }

    async deleteAllProducts(){
        try{
            await fs.writeFile(this.pathFile,"[]");
        }
        catch(error){
            console.log(`Se produjo un error al intentar eliminar todos los productos. ERROR: ${error.message}`);
        }
    }
}

module.exports = Product;
