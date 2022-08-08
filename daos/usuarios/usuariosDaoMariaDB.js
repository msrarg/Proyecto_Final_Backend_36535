import {ContenedorDB} from '../../containers/index.js';

class UsuariosDaoMariaDB extends ContenedorDB {
    constructor() {
        super('usuarios');
    }
}

export default UsuariosDaoMariaDB;