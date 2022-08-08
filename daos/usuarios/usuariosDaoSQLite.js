import {ContenedorDB} from '../../containers/index.js';

class UsuariosDaoSQLite extends ContenedorDB {
    constructor() {
        super('usuarios');
    }
}

export default UsuariosDaoSQLite;