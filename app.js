const express = require("express");
const cors = require("cors");
const db = require("./src/DataBase");

const app = express();
require("dotenv").config()


app.use(cors())
app.use(express.json())
const port = process.env.PORT


app.listen(port, () =>{
    console.log("Server levantado en puerto "+port)
    db()
})

module.exports = app;
