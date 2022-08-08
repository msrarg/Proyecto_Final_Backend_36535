import {ContenedorMemoria} from '../../containers/index.js';
import {store_memoria} from "../../config/db.js";

class UsuariosDaoMemoria extends ContenedorMemoria {
    constructor() {
        super(store_memoria.usuarios_memoria);
    }
}

export default UsuariosDaoMemoria;