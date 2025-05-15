const express = require("express")

const route = express.Router()

const Produtos = require("../controllers/produtos")
const Venda = require("../controllers/venda")

route.get("/produtos/:nome_produto?", async (req, res) => {
    const usuario = req.params.usuario
    const nome_produto = req.params.nome_produto || req.query.nome_produto || ""

    if (usuario == undefined)
        return res.send({ error: "Você precisa informar o usuário" })
    var retorno = await Produtos.Listar(usuario, nome_produto)

    return res.send(retorno)
})

route.post("/venda", async (req, res) => {
    const usuario = req.usuarioId
    const { nomeCliente, data, produtos } = req.body

    if (nomeCliente == "" || nomeCliente == undefined)
        return res.send({ erro: "Nome do cliente não pode ser nulo." })

    if (produtos == "" || produtos == undefined)
        return res.send({ erro: "Produtos não pode ser nulo." })

    var retorno = await Venda.Novo(usuario, nomeCliente, data, produtos)

    return res.send(retorno)
})


module.exports = app => app.use("/app", route)
