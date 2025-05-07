const Usuario = require("../models/usuario")
const jwt = require("jsonwebtoken")

module.exports = {
    Registrar: async (usuario, senha) => {
        try {
            let user = await Usuario.create({ usuario, senha })
            return user
        } catch (e) {
            console.log(e.Stack)
            return { erro: "Erro ao registrar usuário." }
        }

    },

    Login: async (usuario, senha) => {
        try {
            let user = await Usuario.findOne({ usuario })

            if (!user)
                return ({ erro: "Usuário não encontrado." })

            if (senha != user.senha)
                return ({ erro: "Senha inválida." })


            const token = await jwt.sign({
                usuario: user.usuario
            }, "PalmeirasoPrimeiroC4mpe4a0Mund1al", { expiresIn: 86400 })

            return { token }
        } catch (e) {
            console.log(e.Stack)
            return { erro: "Erro ao registrar usuário." }
        }
    }
}