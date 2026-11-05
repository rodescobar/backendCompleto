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
        const { nome_categoria } = req.body || {}
        const usuario = req.usuarioId

        if (nome_categoria == "" || nome_categoria == undefined)
            return res.status(400).send({ erro: "Nome da categoria não pode ser nulo." })

        var ret = await Categorias.Novo(nome_categoria, usuario)
        if (ret && ret.erro)
            return res.status(500).send(ret)
        return res.send(ret)
    }
    catch(e) {
        console.error(e.stack || e)
        return res.status(500).send({ erro: "Erro ao criar categoria." })
    }
})

route.put("/categorias", async (req, res) => {
    const { id, nome_categoria } = req.body || {}
    const usuario = req.usuarioId
    try {
        if (id == "" || id == undefined)
            return res.status(400).send({ erro: "Id não pode ser nulo." })

        if (nome_categoria == "" || nome_categoria == undefined)
            return res.status(400).send({ erro: "Nome da categoria não pode ser nulo." })

        var ret = await Categorias.Alterar(id, nome_categoria, usuario)
        if (!ret)
            return res.status(404).send({ erro: "Categoria não encontrada." })
        return res.send(ret)
    }
    catch (e) {
        console.error(e.stack || e)
        return res.status(500).send({ erro: "Erro ao atualizar categoria." })
    }
})

route.delete("/categorias", async(req, res) => {
    const { id } = req.body || {}
    const usuario = req.usuarioId

    if (id == "" || id == undefined)
        return res.status(400).send({ erro: "Id não pode ser nulo." })

    try {
        var ret = await Categorias.Excluir(id, usuario)
        if (!ret.deletedCount)
            return res.status(404).send({ erro: "Categoria não encontrada." })
        return res.send(ret)
    } catch (e) {
        return res.status(400).send({ erro: "Id de categoria inválido." })
    }
})

module.exports = app => app.use("/app", route)
