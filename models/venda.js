const mongoose = require('./database')

const { Schema } = mongoose;

const Vendas = new Schema({
    usuario: {
        type: String,
        required: true
    },
    nomeCliente:  {
        type: String,
        required: true
    },
    data: {
        type: Date,
        required: true
    },
    produtos: [
        {
            nome:  {
                type: String,
                required: true
            },
            quantidade: {
                type: Number,
                required: true
            },
            preco: {
                type: Number,
                required: true
            }
        }
    ]
});

const Venda = mongoose.model('Vendas', Vendas);

module.exports = Venda
