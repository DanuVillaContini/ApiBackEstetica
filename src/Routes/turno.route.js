const { Router } = require("express")
const { expressValidations } = require("../Middleware/common.validation")
const { check, param, body } = require("express-validator")
const { createTurno, eliminarTurno, actualizarTurno, mostrarTurnos } = require("../Controllers/turno.controller")

const turnosRouter = Router()

turnosRouter.post('/crear-turno',
    [
        check('dia_disponible', 'debes ingresar correctamente el dia (del 01 al 31)').isNumeric().isLength({ min: 1, max: 2 }),
        check('mes_disponible', 'debes ingresar correctamente el mes (del 01 al 12)').isNumeric().isLength({ min: 1, max: 2 }),
        check('hora_disponible', 'debes ingresar correctamente la hora (del 00 al 23)').isNumeric().isInt({ min: 0, max: 23 }),
        check('minute_disponible', 'debes ingresar correctamente los minutos (del 00 al 59)').isNumeric().isInt({ min: 0, max: 59 }),
    ],
    expressValidations, createTurno);

turnosRouter.get('/mostrar-turnos', mostrarTurnos);

turnosRouter.put('/actualizar-turno/:id',
    [
        param('id').isMongoId().withMessage('Debe mandar un ID válido'),
        body('dia_disponible', 'Debes ingresar correctamente el día (del 01 al 31)').isNumeric().optional(),
        body('mes_disponible', 'Debes ingresar correctamente el mes (del 01 al 12)').isNumeric().optional(),
        body('hora_disponible', 'Debes ingresar correctamente la hora (del 00 al 23)').isNumeric().optional(),
        body('minute_disponible', 'Debes ingresar correctamente los minutos (del 00 al 59)').isNumeric().optional(),
        body('disponible').isBoolean().optional() 
    ],
    expressValidations,
    actualizarTurno
);

turnosRouter.delete('/eliminar-turno/:id',
    [
        param("id").isMongoId().withMessage("Debe mandar un id valido")
    ],
    expressValidations,
    eliminarTurno
);




module.exports = turnosRouter;
