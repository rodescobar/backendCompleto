const mongoose = require('./database')

const { Schema } = mongoose;

const Categorias = new Schema({
    usuario: {
        type: String,
        required: true
    },
    nome:  {
        type: String,
        required: true
    }
});

const Cat = mongoose.model('Categorias', Categorias);

module.exports = Cat
