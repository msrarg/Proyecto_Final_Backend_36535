import { createTransport } from 'nodemailer';
import Handlebars from 'handlebars';
import path from 'path';
import {fileURLToPath} from 'url';
import { promises as fs } from 'fs';
import logger from '../utils/logger.js';

const transporter = createTransport({
    host: process.env.SMTP_HOST,
    port: 587,
    auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD
    }
});

const enviarMail = async (to,subject,html) => {
    try {
        const mailOptions = {
            to,
            subject,
            html
        }
        await transporter.sendMail(mailOptions)
     } catch (error) {
        logger.error(error.message)
     }
}

const enviarMailAdministrador = async(type, subject, data) => {
    try {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        let templateFile,templateContent;
    
        if (type === 'nuevoRegistro') {
            templateFile = "../views/templates/userNew.hbs";
            templateContent = {data};
        }
    
        if (type === 'nuevoPedido') {
            templateFile = "../views/templates/orderNew.hbs";
            const {nombre,email} = data.user;
            const totalCarrito = data.productos.map(item => item.total).reduce((prev, next) => prev + next);
            templateContent = {user:{nombre,email},productos:data.productos,totalCarrito};
        }

        const emailTemplateSource = await fs.readFile(path.join(__dirname, templateFile), "utf8")
        const template = Handlebars.compile(emailTemplateSource);
        const htmlMessage = template(templateContent);

        await enviarMail(process.env.ADMIN_EMAIL, subject, htmlMessage);            
    } catch (error) {
        logger.error(error.message)
    }
}

export {
    enviarMailAdministrador
}