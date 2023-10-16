const mongoose = require('mongoose');

const reservaSchema = new mongoose.Schema({
    turno: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Turno', 
        required: true,
    },
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cliente', 
        required: true,
    },
});

const Reserva = mongoose.model('Reserva', reservaSchema);

module.exports = Reserva;
