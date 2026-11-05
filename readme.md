# API de Administração de Loja Virtual

API REST usada no trabalho de Computação de Dispositivos Móveis II para administrar usuários, categorias, produtos e vendas.

## Executar localmente

1. Instale o Node.js;
2. Instale as dependências:

```bash
npm install
```

3. Crie um arquivo `.env` a partir de `.env.example`;
4. Informe uma conexão válida do MongoDB;
5. Inicie a API:

```bash
npm start
```

A API ficará disponível em `http://localhost:3000`.

## Variáveis de ambiente

```env
DATABASE_SERVER=mongodb://localhost:27017/loja_virtual
JWT_SECRET=uma-chave-secreta-forte
PORT=3000
```

Tokens antigos assinados com a chave histórica continuam sendo aceitos apenas durante a migração. Em produção, configure obrigatoriamente `JWT_SECRET`.

## Swagger

Documentação local:

```text
http://localhost:3000/api-docs/
```

Documentação publicada:

```text
https://rodescobar.github.io/backendCompleto/api/swagger-ui/
```

## Scripts

```bash
npm start   # inicia a API
npm test    # executa os testes de fumaça
npm run check # verifica a sintaxe dos arquivos principais
```

## Rotas principais

- `POST /app/registrar`
- `POST /app/login`
- `GET /app/perfil`
- `GET|POST|PUT|DELETE /app/categorias`
- `GET|POST|PUT|DELETE /app/produtos`
- `GET /app/produtos/{usuario}`
- `GET|POST|DELETE /app/venda`

Consulte o Swagger para os corpos das requisições, autenticação e respostas possíveis.

## Entrega dos alunos

O enunciado completo está em [ENUNCIADO.md](./ENUNCIADO.md).
