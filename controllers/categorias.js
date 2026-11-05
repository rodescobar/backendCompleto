const Categorias = require("../models/categoria"); // Fixed import path

module.exports = {
    Listar: async (usuario, nome_categoria) => {
        if (nome_categoria) {
            return await Categorias.find({ 
                    usuario, 
                    nome: { $regex: nome_categoria, $options: 'i' } 
            });
        } else {
            return await Categorias.find({ usuario });
        }
    },

    Novo: async (nome, usuario) => {
        try {
            return await Categorias.create({ usuario, nome })
        }
        catch(e) {
            console.log(e)
            return { erro: "Erro ao criar categoria." }
        }
    },

    Alterar: async (id, nome, usuario) => {
        try {
            return await Categorias.findOneAndUpdate(
                { _id: id, usuario },
                { nome },
                { new: true, runValidators: true }
            )
        }
        catch (e) {
            console.log(e)
        }
    },

    Excluir: async (id, usuario) => {
        return await Categorias.deleteOne({ _id: id, usuario: usuario })
    },
}
