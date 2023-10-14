const Usuario = require("../Models/usuario.model");

const createUsuario = async (req, res) => {
    try {
        const {
            name, apellido, telefono, correo, dni
        } = req.body;

        const usuario = new Usuario({
            name, apellido, telefono, correo, dni
        });
        await usuario.save();
        res.status(201)
        res.json({ message: "Usuario registrado con exito" })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "ha ocurrido un problema con el servidor" })
    }
}
const mostrarUsuario = async (req, res) => {
    try {
        const nameRegex = new RegExp(req.query.name);
        const apellidoRegex = new RegExp(req.query.apellido);
        const filters = {
            name: {
                $regex: nameRegex,
            },
            apellido: {
                $regex: apellidoRegex,
            }
        };
        const usuario = await Usuario.find(filters);
        res.json({ message: "Usuarios encontrados", data: usuario });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ha ocurrido un error en el servidor" });
    }
}
const mostrarIdUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id);
        if (usuario === null) {
            res.status(404);
            return res.json({ message: "Usuario no encontrado" });
        }
        res.json({ message: "FIND Usuario BY ID", data: usuario });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ha ocurrido un error en el servidor" });
    }
}
const actualizarUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id);
        if (usuario === null) {
            res.status(404);
            return res.json({ message: "Usuario no encontrado" });
        }
        await Usuario.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            apellido: req.body.apellido,
            telefono: req.body.telefono,
            correo: req.body.correo,
            dni: req.body.dni
        });
        res.json({ message: "Usuario actualizado" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ha ocurrido un error en el servidor" });
    }
};
const eliminarUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id);
        if (usuario === null) {
            res.status(404);
            return res.json({ message: "Usuario no encontrado" });
        }
        const filters = { _id: req.params.id };
        const deletedDocuments = await Usuario.deleteOne(filters);
        res.json({ message: "Usuario: " + usuario.name + " eliminado" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ha ocurrido un error en el servidor" });
    }
};
module.exports = { createUsuario, mostrarUsuario, mostrarIdUsuario, actualizarUsuario, eliminarUsuario }