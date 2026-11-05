const mongoose = require("mongoose")

require("dotenv/config")

const uri = process.env.DATABASE_SERVER

if (!uri) {
    console.error("DATABASE_SERVER não foi configurada.")
} else {
    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).catch((err) => {
        console.error("Erro ao conectar ao MongoDB:", err.message)
    })
}

mongoose.Promise = global.Promise

module.exports = mongoose
