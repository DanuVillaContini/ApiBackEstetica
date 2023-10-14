const { Router } = require("express")
const { createUsuario, mostrarUsuario, mostrarIdUsuario, actualizarUsuario, eliminarUsuario } = require("../Controllers/usuario.controller")
const { expressValidations } = require("../Middleware/common.validation")
const { check, param, body } = require("express-validator")

const usuarioRouter = Router()

usuarioRouter.post("/create", [
    check('name', "Ingrese nombre del usuario").notEmpty(),
    check('apellido', "Ingrese apellido del usuario").notEmpty(),
    check("telefono", "Debe mandar un telefono").notEmpty(),
    check('correo', 'Ingrese el correo del usuario').notEmpty(),
    check('correo', 'El Correo debe ser una dirección de correo electrónico válida').isEmail(),
    check('dni', "Ingrese el DNI del usuario").notEmpty()
],
    expressValidations,
    createUsuario
)
usuarioRouter.get("/mostrar", mostrarUsuario)
usuarioRouter.get("/mostrar-by-id/:id",
    [
        param("id").isMongoId().withMessage("Debe mandar un id valido")

    ],
    expressValidations,
    mostrarIdUsuario
)
usuarioRouter.put("/actualizar/:id",
[
    param("id").isMongoId().withMessage("Debe mandar un ID válido"),
    body("name").isString().optional().withMessage("Debe mandar un nombre"),
    body("apellido").isString().optional().withMessage("Debe mandar un apellido"),
    body("telefono").isNumeric().optional().withMessage("Debe mandar un telefono"),
    body("correo").isString().optional().withMessage("Debe mandar un contacto personal"),
    body("dni").isNumeric().optional().withMessage("Debe mandar un número de legajo válido")

],
expressValidations,
actualizarUsuario
)

usuarioRouter.delete("/eliminar/:id",
[
    param("id").isMongoId().withMessage("Debe mandar un id valido")
],
expressValidations,
eliminarUsuario
)



module.exports = usuarioRouter;
