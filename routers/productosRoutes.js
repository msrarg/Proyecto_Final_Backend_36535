const { Router } = require('express');

const { productosGetAllGetById,
        productoSave,
        productoUpdate,
        productoDelete   
} = require('../controllers/productosController');

const { validatePermissions } = require('../middlewares/validateRole');

const router = Router();

// El signo ? me indica que es un parámetro opcional en la ruta.
router.get(   '/:id?', productosGetAllGetById);  // Permite listar todos los productos disponibles ó un producto por su id (disponible para usuarios y administradores)
router.post(  '/',     validatePermissions, productoSave);   // Para incorporar productos al listado (disponible para administradores)
router.put(   '/:id',  validatePermissions, productoUpdate); // Actualiza un producto por su id (disponible para administradores)
router.delete('/:id',  validatePermissions, productoDelete); // Borra un producto por su id (disponible para administradores)

module.exports = router;
