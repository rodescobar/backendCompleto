const express = require("express")

const route = express.Router()

const Produtos = require("../controllers/produtos")
const Venda = require("../controllers/venda")

route.get("/produtos/:usuario?/:nome_produto?", async (req, res) => {
    const usuario = req.params.usuario || req.query.usuario || ""
    const nome_produto = req.params.nome_produto || req.query.nome_produto || ""

    if (usuario == "" || usuario == undefined)
        return res.status(400).send({ erro: "Usuário não pode ser nulo." })

    try {
        var retorno = await Produtos.Listar(usuario, nome_produto)
        return res.send(retorno)
    } catch (e) {
        return res.status(500).send({ erro: "Erro ao consultar produtos." })
    }
})

route.post("/venda", async (req, res) => {
    const { nomeCliente, data, produtos, usuario } = req.body || {}

    if (typeof usuario !== "string" || usuario.trim() === "")
        return res.status(400).send({ erro: "Usuário não pode ser nulo." })
        
    if (nomeCliente == "" || nomeCliente == undefined)
        return res.status(400).send({ erro: "Nome do cliente não pode ser nulo." })

    if (!Array.isArray(produtos) || produtos.length === 0)
        return res.status(400).send({ erro: "Produtos não pode ser nulo." })

    try {
        var retorno = await Venda.Novo(usuario.trim(), nomeCliente, data, produtos)
        if (retorno && retorno.erro)
            return res.status(500).send(retorno)
        return res.status(201).send(retorno)
    } catch (e) {
        return res.status(500).send({ erro: "Erro ao criar venda." })
    }
})


module.exports = app => app.use("/app", route)
