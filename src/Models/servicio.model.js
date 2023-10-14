const mongoose = require("mongoose")
const serviciosSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minLenght: 3,
            maxLenght: 15
        },
        descripcion: {
            type: String,
            required: true,
            trim: true,
            minLenght: 5,
            maxLenght: 100
        },
        precio: {
            type: Number,
            required: true,
            trim: true,
            unique: true,
            minLenght: 3,
        },
        // imagen: {
        //     type: imagen,
        //     required: true,
        //     unique: true,
        //     minLenght: 5
        // }
    }
)

const Servicios = mongoose.model("Servicios", serviciosSchema)
module.exports = Servicios