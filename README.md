# Proyecto Final Node

Proyecto ecommerce backend

1 - Instalar las dependecias.
npm install

2 - Definir las variables de entorno en el .env de acuerdo al .env.sample

3 - Crear la estructura de db local en caso de sqlite/mysql
npm run create-db

4 - Arrancar server modo desarrollo
npm run dev -- -p NUMERO_DE_PUERTO

Para realizar pruebas locales se puede importar este [archivo](./postman_collection.json)  en Postman y ver los endpoints disponibles.

# Endpoints

Productos

- Obtener producto/s `GET       /api/productos/:id?` 
- Crear producto/s `POST        /api/productos/`
- Actualizar producto `PUT      /api/productos/:id`
- Eliminar producto `DELETE     /api/productos/:id`

Carrito

- Crear carrito `POST                   /api/carrito/`
- Eliminar carrito `DELETE              /api/carrito/:id`
- Obtener producto/s del carrito `GET   /api/carrito/:id/productos` 
- Agregar producto/s al carrito `POST   /api/carrito/:id/productos` 
- Eliminar producto del carrito `DELETE /api/carrito/:id/productos/:id_prod` 

Usuarios

- Crear usuario `POST /api/usuarios/signup`
- Login usuario `POST /api/usuarios/login`


# Notificaciones

Las notificaciones de los nuevos usuarios y pedidos se realizan mediante email, whatsapp y sms utilizando Twilio.

#### Nuevo registro de usuario:

![Nuevo registro por email](./docs/email_notification.png "Notificación Nuevo registro")

#### Nuevo pedido:

![Nuevo pedido por email](./docs/email_order_notification.png "Notificación Nuevo pedido por email")
![Nuevo pedido por sms](./docs/sms_notification.png "Notificación Nuevo pedido por sms")
![Nuevo pedido por whatsapp](./docs/wa_notification.png "Notificación Nuevo pedido por whatsapp")

---
\
Las imágenes de los perfiles de usuarios se suben utilizando el servicio [Cloudinary](https://cloudinary.com)