const express = require("express");
const cors = require("cors");
const db = require("./src/DataBase");

const app = express();

app.use(cors())
app.use(express.json())

// mongoose.connect()
app.listen(4000, () =>{
    console.log("Server levantado en puerto 4000")
    db()
})

module.exports = app;
