const Usuario = require("../models/usuario")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const { jwtSecret } = require("../config/auth")

const semSenha = (user) => {
    const retorno = user.toObject ? user.toObject() : { ...user }
    delete retorno.senha
    return retorno
}

module.exports = {
    Registrar: async (usuario, senha) => {
        try {
            const senhaHash = await bcrypt.hash(String(senha), 10)
            const user = await Usuario.create({
                usuario: usuario.trim(),
                senha: senhaHash
            })
            return semSenha(user)
        } catch (e) {
            if (e.code === 11000)
                return { erro: "Usuário já cadastrado." }
            console.error(e.stack || e)
            return { erro: "Erro ao registrar usuário." }
        }

    },

    Login: async (usuario, senha) => {
        try {
            let user = await Usuario.findOne({ usuario })

            if (!user)
                return ({ erro: "Usuário não encontrado." })

            let senhaValida = false
            const senhaHash = String(user.senha || "")

            if (/^\$2[aby]\$/.test(senhaHash)) {
                senhaValida = await bcrypt.compare(String(senha), senhaHash)
            } else {
                // Migração compatível com contas antigas em texto puro.
                senhaValida = String(senha) === senhaHash
                if (senhaValida) {
                    user.senha = await bcrypt.hash(String(senha), 10)
                    await user.save()
                }
            }

            if (!senhaValida)
                return ({ erro: "Senha inválida." })


            const token = jwt.sign({
                usuario: user.usuario
            }, jwtSecret, { expiresIn: 86400 })

            return { token }
        } catch (e) {
            console.error(e.stack || e)
            return { erro: "Erro ao fazer login." }
        }
    },

    Perfil: async (usuario) => {
        return await Usuario.findOne({ usuario }).select("-senha")
    }
}
