const jwt = require("jsonwebtoken")
const { jwtSecret, legacyJwtSecret } = require("../config/auth")

const erroAutenticacao = (res, mensagem) => {
    // `erro` mantém compatibilidade com os consumidores antigos da API.
    return res.status(401).send({ error: mensagem, erro: mensagem })
}

module.exports = (req, res, next) => {
    const header = req.headers.authorization || ""
    const [scheme, value, ...rest] = header.trim().split(/\s+/)

    if (!header)
        return erroAutenticacao(res, "Token não foi encontrado")

    if (!/^Bearer$/i.test(scheme) || !value || rest.length > 0)
        return erroAutenticacao(res, "Token mal formatado")

    let data
    try {
        data = jwt.verify(value, jwtSecret)
    } catch (erro) {
        // Permite a migração dos tokens antigos quando JWT_SECRET foi trocada.
        if (jwtSecret === legacyJwtSecret)
            return erroAutenticacao(res, "Token inválido ou já expirou")

        try {
            data = jwt.verify(value, legacyJwtSecret)
        } catch (legacyErro) {
            return erroAutenticacao(res, "Token inválido ou já expirou")
        }
    }

    if (!data || !data.usuario)
        return erroAutenticacao(res, "Token inválido ou já expirou")

    req.usuarioId = data.usuario
    return next()
}
