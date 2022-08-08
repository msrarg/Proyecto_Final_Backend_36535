import mongoose from 'mongoose'


const UserSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    direccion: {
        type: String,
        required: true,
    },
    edad: {
        type: Number,
        required: true,
    },
    telefono: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    imageProfile: {
        type: String,
        required: false,
    }
})

export default mongoose.model('User', UserSchema)
