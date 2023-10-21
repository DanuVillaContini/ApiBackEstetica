const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("../common/const")


//Funcion que verifica el JWT
const verifyJWT = (req, res, next) => {
    if(!req.headers.authorization)return res.status(401).json({ message: 'Unauthorization' })

    const authorization = req.headers.authorization
    const token = authorization.split(" ")[1]

    //verificacion
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Token invalido' })
        }

        //El token es valido, guardamos los datos del ususario en el objeto 're'
        next()
    })
}

module.exports = {
    verifyJWT 
}