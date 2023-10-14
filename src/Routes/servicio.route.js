const { Router } = require("express")
const { expressValidations } = require("../Middleware/common.validation")
const { createServ, mostrarServi, mostrarIdServi, actualizarServi, EliminarServicio } = require("../Controllers/servicio.controller")
const { check, param, body } = require("express-validator")

const servicioRouter = Router()

servicioRouter.post("/create", [
    check('name', "Ingrese nombre del servicio").notEmpty(),
    check('descripcion', "Ingrese descripcion del servicio").notEmpty(),
    check('precio', "Ingrese el precio del servicio").notEmpty()
],
    expressValidations,
    createServ
)
servicioRouter.get("/mostrar", mostrarServi)
servicioRouter.get("/mostrar-by-id/:id",
    [
        param("id").isMongoId().withMessage("Debe mandar un id valido")

    ],
    expressValidations,
    mostrarIdServi
)
servicioRouter.put("/actualizar/:id",
    [
        param("id").isMongoId().withMessage("Debe mandar un ID válido"),
        body('name').isString().optional().withMessage("Debe mandar un nombre"),
        body('descripcion').isString().optional().withMessage("Debe mandar una descripcion"),
        body('precio').isNumeric().optional().withMessage("Debe ingresar un precio")
    ],
    expressValidations,
    actualizarServi
)

servicioRouter.delete("/eliminar/:id",
    [
        param("id").isMongoId().withMessage("Debe mandar un id valido")
    ],
    expressValidations,
    EliminarServicio
)



module.exports = servicioRouter;