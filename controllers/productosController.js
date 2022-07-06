const Product = require('../models/product');

const product = new Product('./db/products.json', 'utf-8');

const productosGetAllGetById = async (req, res) => {
    const id = parseInt(req.params.id);
    if(isNaN(id)){
        const productos = await product.getAllProducts();
        res.status(200).json(productos);
    }else{
        const producto = await product.getProductById(id);
        if (producto !== null) {
            res.status(200).json(producto);
        } else {
            res.status(400).json({error:'Producto no encontrado'});
        }
    }
}

const productoSave = async (req, res) => {
    const producto = req.body;
    const id = await product.saveProduct(producto);
    if (!isNaN(id)) {
        res.status(201).json({id});
    } else {
        res.status(400).json({error:'No se pudo guardar el producto.'});
    }
}

const productoUpdate = async (req, res) => {
    const id = parseInt(req.params.id);
    const producto = await product.getProductById(id);
    if (producto !== null) {
        await product.updateProductById(id, req.body);
        res.status(200).json({mensaje: `Se ha actualizado el producto ${id}`});
    } else {
        res.status(400).json({error:'producto no encontrado'});
    }
}

const productoDelete = async (req, res) => {
    const id = parseInt(req.params.id);
    const producto = await product.getProductById(id);
    if (producto !== null) {
        await product.deleteProductById(id)
        res.status(200).json({mensaje: `Se ha eliminado el producto ${id}`});
    } else {
        res.status(400).json({error:'producto no encontrado'});
    }
}

module.exports = {
    productosGetAllGetById,
    productoSave,
    productoUpdate,
    productoDelete
};
