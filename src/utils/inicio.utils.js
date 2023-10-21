
const Personal = require("../models/personal.model");
const bcrypt = require('bcryptjs');

const iniciarSuperUsuarioDB = async () => {
    try {
        const collection = await Personal.find();
        if (collection.length > 0) return;
        var salt = bcrypt.genSaltSync(5);
        var hashedPassword = bcrypt.hashSync("academy1234", salt);
        const superUsuario = new Personal({
            nameUser: "superuser",
            lastnameUser: "Super",
            telefono: "123456789",
            correo: "superuser@example.com",
            dniUser: "1",
            isAdmin: true,
            pass: hashedPassword
        });
        await superUsuario.save();
    } catch (error) {
        console.error("Error al crear el super usuario:", error);
    }
};
module.exports = {
    iniciarSuperUsuarioDB, iniciarInstitutoDB
}