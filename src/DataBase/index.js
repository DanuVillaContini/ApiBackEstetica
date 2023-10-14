const mongoose = require("mongoose")

const MONGO_URI = "";

const db = async () => {
    await mongoose
        .connect(MONGO_URI)
        .then(() => console.log("DB FUNCIONANDO"))
        .catch((error) => console.error(error))
}

module.exports = db;