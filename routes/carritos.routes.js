const { Router } = require('express');

const { carritoSave,
        carritoDelete,
        carritoProductosGetAll,
        carritoProductoSave,
        carritoProductoDelete } = require('../controllers/carritos.controller');

const router = Router();

router.post(  '/',    carritoSave)   // Crea un carrito y devuelve su id.
router.delete('/:id', carritoDelete) // Vacía un carrito y lo elimina.
router.get(   '/:id/productos',          carritoProductosGetAll) // Permite listar todos los productos guardados en el carrito
router.post(  '/:id/productos',          carritoProductoSave)    // Para incorporar productos al carrito por su id de producto
router.delete('/:id/productos/:id_prod', carritoProductoDelete)  // Eliminar un producto del carrito por su id de carrito y de producto

module.exports = { router };
