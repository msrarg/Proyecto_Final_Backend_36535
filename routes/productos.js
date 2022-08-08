import { Router } from 'express';
import productsController from '../controllers/productos.js';
import { esAdmin } from '../middlewares/validar-admin.js';

const router = Router();

router.get('/:id?',productsController.getProducts)
router.post('/',esAdmin ,productsController.addProducts)
router.put('/:id',esAdmin,productsController.updateProduct)
router.delete('/:id',esAdmin,productsController.deleteProduct)


export default router;