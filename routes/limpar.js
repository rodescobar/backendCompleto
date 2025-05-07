const express = require("express");

const route = express.Router();

const Categorias = require("../models/categoria"); // Fixed import path
const Produtos = require("../models/produtos");
const Usuario = require("../models/usuario");
const Venda = require("../models/venda");

route.get("/limpar", async (req, res) => {
    try {
        const usuario = req.usuarioId;

        if (!usuario) {
            return res.status(400).send({ erro: "Usuário não autenticado." });
        }

        // Remove all records for the authenticated user
        await Categorias.deleteMany({ usuario });
        await Produtos.deleteMany({ usuario });
        await Usuario.deleteOne({ usuario: usuario });
        await Venda.deleteMany({ usuario });

        return res.send({ mensagem: "Tabelas limpas com sucesso para o usuário." });
    } catch (e) {
        console.log(e);
        return res.status(500).send({ erro: "Erro ao limpar tabelas." });
    }
});

module.exports = app => app.use("/app", route);


