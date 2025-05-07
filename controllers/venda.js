const Venda = require("../models/venda")

module.exports = {
    Listar: async (usuario, id) => {
        if (id) {
            return await Venda.find({ usuario, _id: id });
        } else {
            return await Venda.find({ usuario });
        }
    },
    Novo: async (usuario, nomeCliente, data, produtos) => {
        try {
            return await Venda.create({ usuario, nomeCliente, data, produtos })
        }
        catch(e) {
            console.log(e)
            return e
        }
    },
    Excluir: async (id, usuario) => {
        return await Venda.deleteOne({ _id: id, usuario: usuario })
    },
}
