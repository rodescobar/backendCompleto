const express = require("express")

const route = express.Router()

const Produtos = require("../controllers/produtos")
const Venda = require("../controllers/venda")

route.get("/produtos/:usuario?/:nome_produto?", async (req, res) => {
    const usuario = req.params.usuario || req.query.usuario || ""
    const nome_produto = req.params.nome_produto || req.query.nome_produto || ""

    if (usuario == "" || usuario == undefined)
        return res.send({ erro: "Usuário não pode ser nulo." })

    var retorno = await Produtos.Listar(usuario, nome_produto)

    return res.send(retorno)
})

route.post("/venda", async (req, res) => {
    const { nomeCliente, data, produtos, usuario } = req.body

    if (usuario == "" || usuario == undefined)
        return res.send({ erro: "Usuário não pode ser nulo." })
        
    if (nomeCliente == "" || nomeCliente == undefined)
        return res.send({ erro: "Nome do cliente não pode ser nulo." })

    if (produtos == "" || produtos == undefined)
        return res.send({ erro: "Produtos não pode ser nulo." })

    var retorno = await Venda.Novo(usuario, nomeCliente, data, produtos)

    return res.send(retorno)
})


module.exports = app => app.use("/app", route)
