const express = require("express")

const route = express.Router()

const Venda = require("../controllers/venda")

route.get("/venda/:id?", async (req, res) => {
    const usuario = req.usuarioId
    const id = req.params.id || req.query.id || ""

    var retorno = await Venda.Listar(usuario, id)

    return res.send(retorno)
})

route.delete("/venda", async (req, res) => {
    const { id } = req.body
    const usuario = req.usuarioId

    if (id == "" || id == undefined)
        return res.send({ erro: "Id não pode ser nulo." })

    var retorno = await Venda.Excluir(id, usuario)

    return res.send(retorno)
})

module.exports = app => app.use("/app", route)