const { Router } = require('express');
const { param, body } = require('express-validator');
const { expressValidations } = require("../Middleware/common.validation")
const {
    crearReserva,
    mostrarReservas,
    actualizarReserva,
    cancelarReserva,
    // historialReservas
} = require('../Controllers/reservas.controller');

const reservaRouter = Router();

// Ruta para crear una reserva
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

// Ruta para mostrar todas las reservas
reservaRouter.get('/mostrar-reservas', mostrarReservas);

// Ruta para actualizar una reserva
reservaRouter.put(
    '/actualizar-reserva/:id',
    [
        param('id', 'ID de reserva inválido').isMongoId(),
        body('otrosDetalles').optional(),
    ],
    expressValidations,
    actualizarReserva
);

// // Ruta para cancelar una reserva
reservaRouter.delete(
    '/cancelar-reserva/:id',
    [
        param('id', 'ID de reserva inválido').isMongoId(),
    ],
    expressValidations,
    cancelarReserva
);

// reservaRouter.get('/historial-reservas', expressValidations, historialReservas);

module.exports = reservaRouter;
