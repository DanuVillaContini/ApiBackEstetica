const mongoose = require("mongoose")
const turnosSchema = mongoose.Schema(
    {
        dia_disponible: {
            type: Number,
            require: true,
            trim: true,
            minLenght: 1,
            maxLenght: 2
        },
        mes_disponible: {
            type: Number,
            require: true,
            trim: true,
            minLenght: 1,
            maxLenght: 2
        },
        hora_disponible: {
            type: Number,
            required: true,
            min: 0,
            max: 23
        },
        minute_disponible: {
            type: Number,
            required: true,
            min: 0,
            max: 59
        }
    }
)
const Turnos = mongoose.model('Turnos', turnosSchema);
module.exports = Turnos;