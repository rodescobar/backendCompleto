const express = require("express")

const route = express.Router()

const Venda = require("../controllers/venda")

route.get("/venda/:id?", async (req, res) => {
    const usuario = req.usuarioId
    const id = req.params.id || req.query.id || ""

    try {
        var retorno = await Venda.Listar(usuario, id)
        return res.send(retorno)
    } catch (e) {
        return res.status(400).send({ erro: "Id de venda inválido." })
    }
})

const excluirVenda = async (req, res) => {
    const id = req.params.id || (req.body && req.body.id)
    const usuario = req.usuarioId

    if (id == "" || id == undefined)
        return res.status(400).send({ erro: "Id não pode ser nulo." })

    try {
        var retorno = await Venda.Excluir(id, usuario)
        if (!retorno.deletedCount)
            return res.status(404).send({ erro: "Venda não encontrada." })

        return res.send(retorno)
    } catch (e) {
        return res.status(400).send({ erro: "Id de venda inválido." })
    }
}

// Mantém a rota antiga com ID no corpo e também aceita a forma REST com ID na URL.
route.delete("/venda", excluirVenda)
route.delete("/venda/:id", excluirVenda)

module.exports = app => app.use("/app", route)
