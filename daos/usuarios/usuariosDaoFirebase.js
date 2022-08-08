import {ContenedorFirebase} from '../../containers/index.js';

class UsuariosDaoFirebase extends ContenedorFirebase {
    constructor() {
        super('usuarios');
    }
}

export default UsuariosDaoFirebase;