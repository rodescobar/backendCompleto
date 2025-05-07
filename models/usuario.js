const mongoose = require('./database')

const { Schema } = mongoose;

const Usuario = new Schema({
    usuario: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    },
});

const usuario = mongoose.model('Usuario', Usuario);


module.exports = usuario
