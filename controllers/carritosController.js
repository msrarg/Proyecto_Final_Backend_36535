const Cart = require('../models/cart');

const cart = new Cart('./db/carts.json', 'utf-8');

// Crea un carrito y devuelve su id.
const carritoSave = async (req, res) => {
    const id_cart = await cart.saveCart()
    res.status(201).json({id_cart});
}

// Vacía un carrito y lo elimina.
const carritoDelete = async (req, res) => {
    const id_cart = parseInt(req.params.id);
    const carrito = await cart.getCartById(id_cart);
    if (carrito !== null) {
        await cart.deleteCartById(id_cart)
        res.status(200).json({mensaje: `Se ha elimi|nado el carrito ${id_cart}`});
    } else {
        res.status(400).json({error:'carrito no encontrado'});
    }
}

// Permite listar todos los productos guardados en el carrito
const carritoProductosGetAll = async (req, res) => {
    const id_cart = parseInt(req.params.id);
    const carrito = await cart.getCartById(id_cart);
    if (carrito !== null) {
        res.status(200).json(carrito.productos);
    } else {
        res.status(400).json({error:'carrito no encontrado'});
    }
}

// Para incorporar productos al carrito por su id de producto
const carritoProductoSave = async (req, res) => {
    const id_cart = parseInt(req.params.id);
    const productos = req.body;
    const carrito = await cart.getCartById(id_cart);
    if (carrito !== null) {
        await cart.saveProductInCart(id_cart, productos);
        res.status(200).json({mensaje: `Productos agregados al carrito: ${id_cart}`});
    } else {
        res.status(400).json({error:'carrito no encontrado'});
    }
}

// Eliminar un producto del carrito por su id de carrito y de producto
const carritoProductoDelete = async (req, res) => {
    const id_cart = parseInt(req.params.id);
    const id_prod = parseInt(req.params.id_prod);
    const carrito = await cart.getCartById(id_cart);
    if (carrito !== null) {
        await cart.deleteProductFromCart(id_cart, id_prod);
        res.status(200).json({mensaje: `Se ha eliminado el producto ${id_prod} del carrito: ${id_cart}`});
    } else {
        res.status(400).json({error:'carrito no encontrado'});
    }
}

module.exports = {
    carritoSave,
    carritoDelete,
    carritoProductosGetAll,
    carritoProductoSave,
    carritoProductoDelete,
}
