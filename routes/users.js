import passport from 'passport';
import { Router } from 'express';
import userController from '../controllers/users.js';

const router = Router();

router.post('/login', 
    passport.authenticate('login', {failureRedirect:'/api/usuarios/fLogin'}), 
    userController.loginPost)
    
router.post('/signup', 
    passport.authenticate('register', {failureRedirect:'/api/usuarios/fRegister'}), 
    userController.signupPost)
    
router.get('/fRegister', userController.signupError)
router.get('/fLogin', userController.loginError)
router.get('/failLogin', userController.failLoginDisplay)
router.get('/failSignup', userController.failSignupDisplay)
router.post('/userUpdate', userController.userUpdate)
router.post('/userImageUpload', userController.userImageUpload)

export default router;