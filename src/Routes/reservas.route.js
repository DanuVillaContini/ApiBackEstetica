const { Router } = require('express');
const { param, body } = require('express-validator');
const { expressValidations } = require("../Middleware/common.validation")
const {
    crearReserva,
    mostrarReservas,
    cancelarReserva,
} = require('../Controllers/reservas.controller');

const reservaRouter = Router();

reservaRouter.post(
    '/crear-reserva',
    [
        body('turnoId', 'ID de turno inválido').isMongoId(),
        body('clienteId', 'ID de cliente inválido').isMongoId(),
        body('otrosDetalles').optional(),
    ],
    expressValidations,
    crearReserva
);

reservaRouter.get('/mostrar-reservas', mostrarReservas);

reservaRouter.delete(
    '/cancelar-reserva/:id',
    [
        param('id', 'ID de reserva inválido').isMongoId(),
    ],
    expressValidations,
    cancelarReserva
);


module.exports = reservaRouter;
