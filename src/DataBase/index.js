const mongoose = require("mongoose")
require("dotenv").config()

const db = async () => {
    await mongoose
        .connect(process.env.MONGO_URI)
        .then(() => {
            console.log("DB FUNCIONANDO")
        })
        .catch((error) => console.error(error))
}


module.exports = db;