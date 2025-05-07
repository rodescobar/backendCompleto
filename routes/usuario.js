const express = require("express")

const route = express.Router()

const Usuario = require("../controllers/usuario")

route.post("/registrar", async (req, res) => {
    const { usuario, senha, confirma } = req.body

    if (usuario == "" || usuario == undefined)
        return res.send({ erro: "Usuário não pode ser nulo." })

    if (senha == "" || senha == undefined)
        return res.send({ erro: "Senha não pode ser nula." })

    if (confirma == "" || confirma == undefined)
        return res.send({ erro: "A confirmação de senha não pode ser nula." })

    if (confirma != senha)
        return res.send({ erro: "Senha e confirma senha são diferentes." })

    var retorno = await Usuario.Registrar(usuario, senha)
    return res.send(retorno)
})

route.post("/login", async (req, res) => {
    const { usuario, senha } = req.body

    if (usuario == "" || usuario == undefined)
        return res.send({ erro: "Usuário não pode ser nulo." })

    if (senha == "" || senha == undefined)
        return res.send({ erro: "Senha não pode ser nula." })

    var retorno = await Usuario.Login( usuario, senha )
    return res.send( retorno )
})

route.get("/login", async (req, res) => {
    res.send("ola")
})

module.exports = app => app.use("/app", route)