import mongoose from 'mongoose'

const ProductoSchema = new mongoose.Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre es obligatorio'],
    },
    descripcion:{
        type: String,
        required: false,
    },
    codigo:{
        type: String,
        required: false,
    },
    foto:{
        type: String,
        required: false,
    },
    precio:{
        type: Number,
        required: [true, 'El precio es obligatorio'],
    },
    stock:{
        type: Number,
        required: [true, 'El stock es obligatorio'],
    },
    timestamp:{
      type: Number,
      required: true,
  }
});

ProductoSchema.methods.toJSON = function(){
  const {__v,_id,...data} = this.toObject();
  data.id = _id;
  return data;
}

export default mongoose.model('Producto',ProductoSchema);
