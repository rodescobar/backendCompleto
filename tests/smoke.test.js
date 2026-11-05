const test = require("node:test")
const assert = require("node:assert/strict")

const app = require("../index")

let server
let baseUrl

test.before(async () => {
    server = app.listen(0)
    await new Promise((resolve) => server.once("listening", resolve))
    baseUrl = `http://127.0.0.1:${server.address().port}`
})

test.after(async () => {
    await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()))
})

test("a documentação Swagger está disponível", async () => {
    const response = await fetch(`${baseUrl}/api-docs/`)
    const body = await response.text()

    assert.equal(response.status, 200)
    assert.match(body, /swagger-ui/i)
})

test("rotas protegidas recusam requisições sem token", async () => {
    const response = await fetch(`${baseUrl}/app/perfil`)
    const body = await response.json()

    assert.equal(response.status, 401)
    assert.equal(body.erro, "Token não foi encontrado")
})

test("registro valida o corpo da requisição", async () => {
    const response = await fetch(`${baseUrl}/app/registrar`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({})
    })
    const body = await response.json()

    assert.equal(response.status, 400)
    assert.equal(body.erro, "Usuário não pode ser nulo.")
})
