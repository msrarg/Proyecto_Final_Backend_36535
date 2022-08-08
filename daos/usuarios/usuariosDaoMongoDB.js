import {ContenedorMongoDB} from '../../containers/index.js';
import User from '../../models/user.js';

class UsuarioDaoMongoDB extends ContenedorMongoDB {
    constructor() {
        super(User);
    }
}

export default UsuarioDaoMongoDB;