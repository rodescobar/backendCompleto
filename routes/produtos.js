const express = require("express")

const route = express.Router()

const Produtos = require("../controllers/produtos")


route.get("/produtos/:nome_produto?", async (req, res) => {
    const usuario = req.usuarioId
    const nome_produto = req.params.nome_produto || req.query.nome_produto || ""

    var retorno = await Produtos.Listar(usuario, nome_produto)

    return res.send(retorno)
})

route.post("/produtos", async (req, res) => {
    try{
        const { nome, quantidade, preco, descricao, imagem, categoria } = req.body
        const usuario = req.usuarioId

        if (nome == "" || nome == undefined)
            return res.send({ erro: "Nome do produto não pode ser nulo." })

        if (quantidade == "" || quantidade == undefined)
            return res.send({ erro: "Quantidade não pode ser nula." })

        if (preco == "" || preco == undefined)
            return res.send({ erro: "Preço não pode ser nulo." })

        if (descricao == "" || descricao == undefined)
            return res.send({ erro: "Descrição não pode ser nula." })

        if (imagem == "" || imagem == undefined)
            return res.send({ erro: "Imagem não pode ser nula." })

        if (categoria == "" || categoria == undefined)
            return res.send({ erro: "categoria não pode ser nula." })        

        var ret = await Produtos.Novo(nome, quantidade, preco, descricao, usuario, imagem, categoria)
        return res.send(ret)
    }
    catch(e) {
        console.log(e)
        return res.send('Erro: ' + e)
    }


})

route.put("/produtos", async (req, res) => {
    const { id, nome, quantidade, preco, descricao, imagem, categoria } = req.body
    const usuario = req.usuarioId
    try {
        if (id == "" || id == undefined)
            return res.send({ erro: "Id não pode ser nulo." })

        if (nome == "" || nome == undefined)
            return res.send({ erro: "Nome do produto não pode ser nulo." })

        if (quantidade == "" || quantidade == undefined)
            return res.send({ erro: "Quantidade não pode ser nula." })

        if (preco == "" || preco == undefined)
            return res.send({ erro: "Preço não pode ser nulo." })

        if (descricao == "" || descricao == undefined)
            return res.send({ erro: "Descrição não pode ser nula." })

        if (imagem == "" || imagem == undefined)
            return res.send({ erro: "Imagem não pode ser nula." })

        if (categoria == "" || categoria == undefined)
            return res.send({ erro: "categoria não pode ser nula." })  
                
        var ret = await Produtos.Alterar(id, nome, quantidade, preco, descricao, usuario, categoria, imagem)
        return res.send(ret)
    }
    catch (e) {
        console.log(e)
    }

})

route.delete("/produtos", async(req, res) => {
    const { id } = req.body
    const usuario = req.usuarioId

    if (id == "" || id == undefined)
        return res.send({ erro: "Id não pode ser nulo." })

    var ret = await Produtos.Excluir(id, usuario)
    return res.send(ret)

})

module.exports = app => app.use("/app", route)