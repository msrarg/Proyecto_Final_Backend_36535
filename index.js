const Server = require('./models/server');
const mongoose = require('mongoose');

global.ADMIN = true;

const server = new Server();
server.listen();

/*
Ver si sirve para conectar a MongoDB:

mongoose.connect('mongodb://localhost:27017/test')
.then(() => {console.log('Conexión a la base de datos establecida')})
.catch(err => { console.log(err) });

const Cat = mongoose.model('Cat', { name: String });

const kitty = new Cat({ name: 'Zildjian' });
kitty.save().then(() => console.log('meow'));
*/