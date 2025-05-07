const express = require("express")

const route = express.Router()

const Categorias = require("../controllers/categorias")

route.get("/categorias/:nome_categoria?", async (req, res) => {
    const usuario = req.usuarioId
    const nome_categoria = req.params.nome_categoria || req.query.nome_categoria || ""

    var retorno = await Categorias.Listar(usuario, nome_categoria)

    return res.send(retorno)
})

route.post("/categorias", async (req, res) => {
    try{
        const { nome_categoria } = req.body
        const usuario = req.usuarioId

        if (nome_categoria == "" || nome_categoria == undefined)
            return res.send({ erro: "Nome da categoria não pode ser nulo." })

        var ret = await Categorias.Novo(nome_categoria, usuario)
        return res.send(ret)
    }
    catch(e) {
        console.log(e)
        return res.send('Erro: ' + e)
    }
})

route.put("/categorias", async (req, res) => {
    const { id, nome_categoria } = req.body
    try {
        if (id == "" || id == undefined)
            return res.send({ erro: "Id não pode ser nulo." })

        if (nome_categoria == "" || nome_categoria == undefined)
            return res.send({ erro: "Nome da categoria não pode ser nulo." })

        var ret = await Categorias.Alterar(id, nome_categoria)
        return res.send(ret)
    }
    catch (e) {
        console.log(e)
    }
})

route.delete("/categorias", async(req, res) => {
    const { id } = req.body
    const usuario = req.usuarioId

    if (id == "" || id == undefined)
        return res.send({ erro: "Id não pode ser nulo." })

    var ret = await Categorias.Excluir(id, usuario)
    return res.send(ret)
})

module.exports = app => app.use("/app", route)