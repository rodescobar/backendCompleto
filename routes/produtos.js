const express = require("express")

const route = express.Router()

const Produtos = require("../controllers/produtos")


route.post("/produtos", async (req, res) => {
    try{
        const { nome, quantidade, preco, descricao, imagem, categoria } = req.body || {}
        const usuario = req.usuarioId

        if (nome == "" || nome == undefined)
            return res.status(400).send({ erro: "Nome do produto não pode ser nulo." })

        if (quantidade == "" || quantidade == undefined)
            return res.status(400).send({ erro: "Quantidade não pode ser nula." })

        if (preco == "" || preco == undefined)
            return res.status(400).send({ erro: "Preço não pode ser nula." })

        if (descricao == "" || descricao == undefined)
            return res.status(400).send({ erro: "Descrição não pode ser nula." })

        if (imagem == "" || imagem == undefined)
            return res.status(400).send({ erro: "Imagem não pode ser nula." })

        if (categoria == "" || categoria == undefined)
            return res.status(400).send({ erro: "categoria não pode ser nula." })

        var ret = await Produtos.Novo(nome, quantidade, preco, descricao, usuario, imagem, categoria)
        if (ret && ret.erro)
            return res.status(500).send(ret)
        return res.status(201).send(ret)
    }
    catch(e) {
        console.log(e)
        return res.status(500).send({ erro: "Erro ao criar produto." })
    }


})

route.put("/produtos", async (req, res) => {
    const { id, nome, quantidade, preco, descricao, imagem, categoria } = req.body || {}
    const usuario = req.usuarioId
    try {
        if (id == "" || id == undefined)
            return res.status(400).send({ erro: "Id não pode ser nulo." })

        if (nome == "" || nome == undefined)
            return res.status(400).send({ erro: "Nome do produto não pode ser nulo." })

        if (quantidade == "" || quantidade == undefined)
            return res.status(400).send({ erro: "Quantidade não pode ser nula." })

        if (preco == "" || preco == undefined)
            return res.status(400).send({ erro: "Preço não pode ser nula." })

        if (descricao == "" || descricao == undefined)
            return res.status(400).send({ erro: "Descrição não pode ser nula." })

        if (imagem == "" || imagem == undefined)
            return res.status(400).send({ erro: "Imagem não pode ser nula." })

        if (categoria == "" || categoria == undefined)
            return res.status(400).send({ erro: "categoria não pode ser nula." })
                
        var ret = await Produtos.Alterar(id, nome, quantidade, preco, descricao, usuario, categoria, imagem)
        if (!ret)
            return res.status(404).send({ erro: "Produto não encontrado." })
        return res.send(ret)
    }
    catch (e) {
        console.error(e.stack || e)
        return res.status(500).send({ erro: "Erro ao atualizar produto." })
    }

})

route.delete("/produtos", async(req, res) => {
    const { id } = req.body || {}
    const usuario = req.usuarioId

    if (id == "" || id == undefined)
        return res.status(400).send({ erro: "Id não pode ser nulo." })

    try {
        var ret = await Produtos.Excluir(id, usuario)
        if (!ret.deletedCount)
            return res.status(404).send({ erro: "Produto não encontrado." })
        return res.send(ret)
    } catch (e) {
        return res.status(400).send({ erro: "Id de produto inválido." })
    }

})

module.exports = app => app.use("/app", route)
