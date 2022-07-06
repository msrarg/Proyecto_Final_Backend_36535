const { response } = require('express')

// respond with 401 if no token was provided
const validatePermissions = ( req, res = response, next ) => {
    const path   = req.originalUrl;
    const method = req.method;
    if (ADMIN !== true){
        return res.status(401).json({
            error: -1,
            descripcion:`La ruta ${path} - método ${method} no autorizada`
        });
    }
    next();
}

module.exports = { validatePermissions }
