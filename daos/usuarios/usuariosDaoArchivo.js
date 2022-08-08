import {ContenedorArchivo} from '../../containers/index.js';
import {store_file} from "../../config/db.js";

class UsuariosDaoArchivo extends ContenedorArchivo {
    constructor() {
        super(store_file.usuarios_file);
    }
}

export default UsuariosDaoArchivo;