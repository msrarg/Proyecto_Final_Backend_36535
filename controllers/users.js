import cloudinary from 'cloudinary'
import { enviarMailAdministrador } from '../utils/mailer.js';
import User from "../models/user.js"; 

cloudinary.config(process.env.CLOUDINARY_URL);


const loginPost = (req, res) => {
    res.status(200).json({
        message:'Acceso autorizado',
        userId: req.user.id,
        authenticated: true
    })
}

const signupPost = async (req, res) => {
    //Notificacion al administrador
    enviarMailAdministrador('nuevoRegistro', 'Nuevo registro', req.body)
    res.status(200).json({
        message:'Usuario registrado',
        userId: req.user.id,
        registered: true
    })
}

const loginError = (req, res) => {
    res.status(400).json({
        message:'Acceso no autorizado',
        authenticated: false
    })
}

const signupError = (req, res) => {
    res.status(400).json({
        message:'No se pudo registrar el usuario.<br> Intente utilizando otro correo electrónico',
        registered: false
    })
}

const failLoginDisplay = (req, res) => {
    res.render("pages/error", {
        errMsg: 'Credenciales no válidas',
        backUrl: '/login'
    });
}

const failSignupDisplay = (req, res) => {
    res.render("pages/error", {
        errMsg: 'Usuario ya registrado',
        backUrl: '/signup'
    });
}

const userUpdate = async (req, res) => {
    try {
        await User.findOneAndUpdate({ _id: req.user.id },req.body);
        res.status(200).json({
            message:'Se han actualizado con éxito las modificaciones.',
            updated:true
        })
            
    } catch (error) {
        res.status(200).json({
            message : error.code == 11000 ? 'El correo ya se encuentra registrado.':'No se pudieron actualizar los datos.',
            updated : false
        })        
    }
}

const userImageUpload = async (req, res) => {

    let user = await User.findById({ _id: req.user.id });

    //Se borra la imagen en el caso que exista
    if (user.imageProfile) {
        const nombreArr = user.imageProfile.split('/');
        const nombre = nombreArr.slice(-2).join('/');
        const [ public_id] = nombre.split('.');
        cloudinary.v2.uploader.destroy(public_id);
    }

    let message,uploaded,imgUrl;
    const {tempFilePath} = req.files.profileImage;
    const {secure_url} = await cloudinary.v2.uploader.upload(tempFilePath, {
        folder:'profileImage', 
        responsive_breakpoints: { 
            create_derived: true, bytes_step: 20000, max_width: 150, 
            transformation: { crop: 'fill', aspect_ratio: '16:9', gravity: 'auto' } 
        } 
    });

    user.imageProfile = secure_url;

    await user.save();

    if (secure_url) {
        message = 'Imagen subida';
        imgUrl = secure_url;
        uploaded = true;
    } else {
        message = 'No se pudo subir la imagen';
        uploaded = false;
    }

    res.status(200).json({
        message,
        uploaded,
        imgUrl
    })
}

export default {
    loginPost,
    signupPost,
    failLoginDisplay,
    failSignupDisplay, 
    loginError,
    signupError,
    userImageUpload,
    userUpdate,
}
