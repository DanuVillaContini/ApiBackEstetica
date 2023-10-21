const Usuario = require("../Models/usuario.model");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("../common/constante")
const { validationResult } = require('express-validator');
const crypto = require('crypto');



const registerUsuario = async (req, res) => {
    try {
        const { name, apellido, telefono, correo, dni, isAdmin } = req.body;

        const existingUser = await Usuario.findOne({ correo });
        if (existingUser) {
            return res.status(400).json({ message: "El correo ya está en uso" });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(req.body.pass, saltRounds);

        const usuario = new Usuario({
            name,
            apellido,
            telefono,
            correo,
            dni,
            pass: hashedPassword,
        });

        await usuario.save();

        const token = jwt.sign(
            {
                userId: usuario._id,
            },
            JWT_SECRET
        );

        res.status(200).json({ access_token: token, message: "Registro de usuario con éxito" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ha ocurrido un problema con el servidor" });
    }
};

const loginUser = async (req, res) => {
    try {
        const { correo, pass } = req.body;

        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            res.status(404);
            return res.json({ message: "Usuario no encontrado" });
        }
        const isMatch = bcrypt.compareSync(pass, usuario.pass);
        if (!isMatch) {
            res.status(401);
            return res.json({ message: "Contraseña incorrecta" });
        }

        const token = jwt.sign(
            {
                userId: usuario._id,
            },
            JWT_SECRET
        );
        res.json({ usuario, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al iniciar sesion" });
    }
};

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
            // correo: req.body.correo,
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
function generaNuevoTokenTemporal() {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buffer) => {
            if (err) {
                reject(err);
            } else {
                resolve(buffer.toString('hex'));
            }
        });
    });
}
const recuperarPassword = async (req, res) => {
    try {
        const { correo, nuevaPass } = req.body; // Se agrega nueva contraseña

        const existingUser = await Usuario.findOne({ correo });
        if (!existingUser) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Generar un token temporal para verificar la autenticidad de la solicitud
        const token = generaNuevoTokenTemporal(); // Debes implementar esta función

        // Almacenar el token temporal en la base de datos junto con la fecha de expiración
        existingUser.resetPasswordToken = token;
        existingUser.resetPasswordExpires = Date.now() + 3600000; // Válido por una hora

        // Almacenar la nueva contraseña encriptada
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(nuevaPass, saltRounds);
        existingUser.pass = hashedPassword;

        // Guardar los cambios en la base de datos
        await existingUser.save();

        // Implementar la lógica para enviar un correo con el token para restablecer la contraseña

        res.status(200).json({ message: "Se ha enviado un correo de recuperación de contraseña" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ha ocurrido un error en el servidor" });
    }
};


module.exports = { registerUsuario, loginUser, mostrarUsuario, mostrarIdUsuario, actualizarUsuario, eliminarUsuario, recuperarPassword };