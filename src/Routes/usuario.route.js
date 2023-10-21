const { Router } = require("express")
const { registerUsuario, mostrarUsuario, mostrarIdUsuario, actualizarUsuario, eliminarUsuario, loginUser, recuperarPassword } = require("../Controllers/usuario.controller")
const { expressValidations } = require("../Middleware/common.validation")
const { check, param, body } = require("express-validator")

const usuarioRouter = Router()

usuarioRouter.post("/register", [
    check('name', "Ingrese nombre del usuario").notEmpty(),
    check('apellido', "Ingrese apellido del usuario").notEmpty(),
    check("telefono", "Debe mandar un telefono").notEmpty(),
    check('correo', 'Ingrese el correo del usuario').notEmpty(),
    check('correo', 'El Correo debe ser una dirección de correo electrónico válida').isEmail(),
    check('dni', "Ingrese el DNI del usuario").notEmpty(),
    check('pass', 'Ingrese la contraseña').notEmpty(), 
],
    expressValidations,
    registerUsuario
)
usuarioRouter.post(
    "/login",
    [
        check("correo", "Debe ingresar un Correo").notEmpty(),
        check("correo", "Formato del correo debe ser example@example.com").isEmail(),
        check("pass", "Debe ingresar la pass de usuario").notEmpty(),
    ],
    expressValidations,
    loginUser
);
usuarioRouter.post(
    "/recuperar-pass",
    [
        check('correo', 'Ingrese el correo del usuario').notEmpty(),
        check('correo', 'El Correo debe ser una dirección de correo electrónico válida').isEmail(),
        check('nuevaPass', 'Ingrese la nueva contraseña').notEmpty(),
    ],
    expressValidations,
    recuperarPassword
);

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
        // body("correo").isString().optional().withMessage("Debe mandar un contacto personal"),
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
