const mongoose = require("mongoose")

require("dotenv/config")

try {
    const uri = process.env.DATABASE_SERVER
    mongoose.connect(
        uri,
        {
            useNewUrlParser: true, 
            useUnifiedTopology: true
        }
    )
} catch (err) {
    console.log(err)
}

mongoose.Promise = global.Promise

module.exports = mongoose
