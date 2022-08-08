import { Carrito }  from '../daos/index.js';
import { Usuario }  from '../daos/index.js';
import { enviarMailAdministrador } from '../utils/mailer.js';
import { sendMessage } from '../utils/messenger.js';

const cart= new Carrito();
const usuario= new Usuario();

const addCart = async(req, res) => {
    const id = await cart.save()
    res.status(201).json({id});
}

const deleteCart = async (req, res) => {
    const id = req.params.id;
    const carrito = await cart.getById(id);
    if (carrito !== null) {
        await cart.deleteById(id)
        res.status(200).json({mensaje: `Se ha eliminado el carrito ${id}`});
    } else {
        const error = `carrito no encontrado`;
        req.app.get('logger').error(error);
        res.status(400).json({error});
    }
}

const getProductsCart = async (req, res) => {
    try {
        const id = req.params.id;
        const carrito = await cart.getById(id);
        if (carrito !== null) {
            const productos = await cart.getProductsCart(id);
            res.status(200).json(productos);
        } else {
            const error = `carrito no encontrado`;
            req.app.get('logger').error(error);
            res.status(400).json({error});
        }
    } catch (error) {
        req.app.get('logger').error(error);
        res.status(400).json({error});
    }

}

const addProductsCart = async (req, res) => {
    try {
        const id = req.params.id;
        const productos = req.body;
        const carrito = await cart.getById(id);
        if (carrito !== null) {
            await cart.addProductsCart(productos, id);
            res.status(200).json({mensaje: `Productos agregados al carrito: ${id}`});
        } else {
            const error = `carrito no encontrado`;
            req.app.get('logger').error(error);
            res.status(400).json({error});
        }
    } catch (error) {
        req.app.get('logger').error(error);
        res.status(400).json({error});
    }

}

const deleteProductCart = async (req, res) => {
    const id = req.params.id;
    const id_prod = req.params.id_prod;
    const carrito = await cart.getById(id);
    if (carrito !== null) {
        await cart.deleteProductCart(id_prod, id);
        res.status(200).json({mensaje: `Se ha eliminado el producto ${id_prod} del carrito: ${id}`});
    } else {
        const error = `carrito no encontrado`;
        req.app.get('logger').error(error);
        res.status(400).json({error});
    }
}

const finishOrder = async (req, res) => {
    try {
        const idCart = req.params.idCart;
        const idUser = req.params.idUser;
        const user = await usuario.getById(idUser);
        const productos = await cart.getProductsCart(idCart);

        const smsMsg = `Gracias ${user.nombre}, hemos recibido su pedido y se encuentra en proceso de preparación. Próximamente recibirá novedades en su email.`
        const subject = `Nuevo pedido de ${user.nombre} (${user.email})`
    
        //Envío de SMS
        await sendMessage(user.telefono, smsMsg)
        //Envío de Whatsapp
        await sendMessage(user.telefono, subject, true)
        //Envío de mail
        await enviarMailAdministrador('nuevoPedido', subject, {user,productos});
    
        res.status(200).json({mensaje: `Se ha finalizado el carrito ${idCart} del usuario: ${idUser}`});        
    } catch (error) {
        req.app.get('logger').error(error);
        res.status(400).json({error});        
    }
}

export default {
    addCart,
    deleteCart,
    getProductsCart,
    addProductsCart,
    deleteProductCart,
    finishOrder,
}