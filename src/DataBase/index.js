const mongoose = require("mongoose")
const { iniciarSuperUsuarioDB } = require("../utils/inicio.utils")
require("dotenv").config()

const db = async () => {
    await mongoose
        .connect(process.env.MONGO_URI)
        .then(() => {
            iniciarSuperUsuarioDB()
            console.log("DB FUNCIONANDO")
        })
        .catch((error) => console.error(error))
}


module.exports = db;