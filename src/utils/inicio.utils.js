
const Personal = require("../Models/usuario.model");
const bcrypt = require('bcryptjs');

const iniciarSuperUsuarioDB = async () => {
    try {
        const collection = await Personal.find();
        if (collection.length > 0) return;
        var salt = bcrypt.genSaltSync(5);
        var hashedPassword = bcrypt.hashSync("esteticaMAGNIFICAT", salt);
        const superUsuario = new Personal({
            name: "superuser",
            apellido: "Super",
            telefono: "123456789",
            correo: "superuser@example.com",
            dni: "11111111",
            isAdmin: true,
            pass: hashedPassword
        });
        await superUsuario.save();
    } catch (error) {
        console.error("Error al crear el super usuario:", error);
    }
};
module.exports = {
    iniciarSuperUsuarioDB
}