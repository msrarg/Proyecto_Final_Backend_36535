import { Router } from 'express';
import carritosController from  '../controllers/carrito.js';

const router = Router();

router.post('/',carritosController.addCart)
router.delete('/:id',carritosController.deleteCart)
router.get('/:id/productos',carritosController.getProductsCart)
router.post('/:id/productos',carritosController.addProductsCart)
router.delete('/:id/productos/:id_prod',carritosController.deleteProductCart)
router.put('/:idCart/usuario/:idUser',carritosController.finishOrder)

export default router;