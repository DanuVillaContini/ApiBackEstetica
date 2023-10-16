const mongoose = require("mongoose");

const turnosSchema = mongoose.Schema(
    {
        dia_disponible: {
            type: Number,
            required: true,
            trim: true,
            minLength: 1,
            maxLength: 2, 
        },
        mes_disponible: {
            type: Number,
            required: true,
            trim: true,
            minLength: 1,
            maxLength: 2,
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
        },
        disponible: {
            type: Boolean,
            default: true
        }
    }
);

const Turnos = mongoose.model('Turnos', turnosSchema);
module.exports = Turnos;
