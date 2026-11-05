const express = require("express")

const route = express.Router()

const Usuario = require("../controllers/usuario")
const auth = require("../auth/auth")

route.post("/registrar", async (req, res) => {
    const { usuario, senha, confirma } = req.body || {}

    if (typeof usuario !== "string" || usuario.trim() === "")
        return res.status(400).send({ erro: "Usuário não pode ser nulo." })

    if (typeof senha !== "string" || senha === "")
        return res.status(400).send({ erro: "Senha não pode ser nula." })

    if (typeof confirma !== "string" || confirma === "")
        return res.status(400).send({ erro: "A confirmação de senha não pode ser nula." })

    if (confirma != senha)
        return res.status(400).send({ erro: "Senha e confirma senha são diferentes." })

    const retorno = await Usuario.Registrar(usuario, senha)
    if (retorno.erro)
        return res.status(400).send(retorno)
    return res.status(201).send(retorno)
})

route.post("/login", async (req, res) => {
    const { usuario, senha } = req.body || {}

    if (typeof usuario !== "string" || usuario.trim() === "")
        return res.status(400).send({ erro: "Usuário não pode ser nulo." })

    if (typeof senha !== "string" || senha === "")
        return res.status(400).send({ erro: "Senha não pode ser nula." })

    const retorno = await Usuario.Login(usuario.trim(), senha)
    return res.status(retorno.erro ? 401 : 200).send(retorno)
})

route.get("/perfil", auth, async (req, res) => {
    try {
        const perfil = await Usuario.Perfil(req.usuarioId)
        if (!perfil)
            return res.status(404).send({ erro: "Usuário não encontrado." })
        return res.send(perfil)
    } catch (e) {
        return res.status(500).send({ erro: "Erro ao consultar perfil." })
    }
})

route.get("/login", async (req, res) => {
    res.send("ola")
})

module.exports = app => app.use("/app", route)
