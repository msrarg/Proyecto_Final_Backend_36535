import { Router } from 'express';
import shopController from '../controllers/shop.js';
import { sessionChecker } from '../middlewares/session-checker.js';
const router = Router();

router.get('/',(req, res) => {res.redirect("/login");})
router.get('/login',shopController.login)
router.get('/logout',shopController.logout)
router.get('/signup',shopController.signup);
router.get('/dashboard', sessionChecker, shopController.dashboard)
router.get('/profile', sessionChecker, shopController.profile)
router.get('/cart', sessionChecker, shopController.cart)

export default router;