const mongoose = require("mongoose")
const usuarioSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minLenght: 3,
            maxLenght: 15
        },
        apellido: {
            type: String,
            required: true,
            trim: true,
            minLenght: 3,
            maxLenght: 30
        },
        telefono: {
            type: String,
            required: true,
            minLenght: 10,
            maxLenght: 15
        },
        correo: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            minLenght: 10,
            maxLenght: 64
        },
        dni: {
            type: Number,
            required: true,
            unique: true,
            minLenght: 5
        },
        isAdmin: {
            type: Boolean,
            required: false,
            default: false
        },
        pass:{
            type:String,
            required: false,
            maxLenght: 200
        }
    }
)

const Usuario = mongoose.model("Usuario", usuarioSchema)
module.exports = Usuario