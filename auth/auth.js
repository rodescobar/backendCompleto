const jwt = require("jsonwebtoken")
require("dotenv/config")

module.exports = async (req, res, next) => {
    const token = (req.headers.authorization)?(req.headers.authorization):("")
    
    if (token == undefined)
        return res.send({ error: "Token não foi encontrado"})

    const valor = token.split(" ")
    const [ baerer, valToken ] = valor

    if (!/^Bearer$/i.test(baerer))
        return res.send({ error: "Token mal formatdo"})
        
    await jwt.verify( valToken, "PalmeirasoPrimeiroC4mpe4a0Mund1al", (erro, data) =>{
        if (erro)
            return res.send({ error: "Token inválido ou já expirou"})
        req.usuarioId =  data.usuario
    })

    return next()
}
