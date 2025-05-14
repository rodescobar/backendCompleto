const Produtos = require("../models/produtos")

module.exports = {
    Listar: async (usuario, nome_produto) => {
        if (nome_produto) {
            return await Produtos.find({ 
                    usuario, 
                    nome: { $regex: nome_produto, $options: 'i' } 
            });
        } else {
            return await Produtos.find({ usuario });
        }
    },

    Novo: async (nome, quantidade, preco, descricao, usuario, imagem, categoria) => {
        try {
            return await Produtos.create({ nome, quantidade, preco, descricao, usuario, imagem, categoria })
        }
        catch(e) {
            console.log(e)
            return e
        }
    },

    Alterar: async (nome, quantidade, preco, descricao, usuario, imagem, categoria) => {
        try {
            return await Produtos.findByIdAndUpdate({_id: id}, { nome, quantidade, preco, descricao, usuario, imagem, categoria }, { new: true})
        }
        catch (e) {
            console.log(e)
        }
    },

    Excluir: async (id, usuario) => {
        return await Produtos.deleteOne({ _id: id, usuario: usuario })
    },
}