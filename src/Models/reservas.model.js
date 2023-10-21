const mongoose = require('mongoose');
const Turnos = require('../Models/turno.model'); 
const Usuario = require('../Models/usuario.model');

const reservaSchema = new mongoose.Schema({
    turno: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Turnos', 
        required: true,
    },
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario', 
        required: true,
    },
    otrosDetalles:{
        type: String,
        requiere: false,
        min:6,
        mas:60
    }
});

const Reserva = mongoose.model('Reserva', reservaSchema);

module.exports = Reserva;
