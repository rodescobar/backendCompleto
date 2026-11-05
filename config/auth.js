require("dotenv/config")

// Mantida somente para permitir a migração dos tokens antigos.
const legacyJwtSecret = "PalmeirasoPrimeiroC4mpe4a0Mund1al"

module.exports = {
    jwtSecret: process.env.JWT_SECRET || legacyJwtSecret,
    legacyJwtSecret
}
