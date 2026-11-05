const express = require('express')
const app = express()
const cors = require("cors")

const swaggerUi = require("swagger-ui-express");
const yaml = require("yamljs");

app.use(cors())
app.use(express.json())

const path = require('path');
const swaggerDocument = yaml.load(path.join(__dirname, 'api', 'swagger-ui', 'swagger.yaml'));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

require("./models/database");

app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Backend Completo</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    text-align: center;
                    padding: 50px;
                    background-color: #f4f4f4;
                }
                .container {
                    background-color: white;
                    border-radius: 8px;
                    padding: 20px;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                    max-width: 600px;
                    margin: 0 auto;
                }
                h1 {
                    color: #333;
                }
                a {
                    color: #007BFF;
                    text-decoration: none;
                }
                a:hover {
                    text-decoration: underline;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Bem-vindo ao Backend Completo</h1>
        <p>Para utilização do backend, consulte a documentação:</p>
        <p><a href="/api-docs/">Swagger local</a></p>
            </div>
        </body>
        </html>
    `);
})

require("./routes/abertas")(app)
require("./routes/usuario")(app)

//MiddleWare
const middleware = require('./auth/auth')
app.use(middleware)


require("./routes/produtos")(app)
require("./routes/categorias")(app)
require("./routes/venda")(app)
require("./routes/limpar")(app)

const port = process.env.PORT || 3000;
if (require.main === module) {
    app.listen(port, () => {
        console.log(`Servidor on na porta ${port}`)
    })
}

module.exports = app

