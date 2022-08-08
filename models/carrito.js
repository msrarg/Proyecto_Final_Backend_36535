import mongoose from 'mongoose'
import Producto from './producto.js';

const CarritoSchema = new mongoose.Schema({
    timestamp:{
        type: Number,
        required: false,
    },
    productos : [{
        producto: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Producto'
        },
        cantidad: {
            type: Number,
            required: true
        }
    }
    ]
});

CarritoSchema.methods.toJSON = function(){
    const {__v,_id,...data} = this.toObject();
    data.id = _id;
    return data;
  }
export default mongoose.model('Carrito',CarritoSchema);