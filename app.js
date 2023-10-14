const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const db = require("./src/DataBase");
const usuarioRouter = require("./src/Routes/usuario.route");

const app = express();
require("dotenv").config()


app.use(cors())
app.use(express.json())
const port = process.env.PORT

app.use(express.json({ limit: "50mb" }))
app.use("/usuario", usuarioRouter)

app.listen(port, () =>{
    console.log("Server levantado en puerto "+port)
    db()
})

module.exports = app;
