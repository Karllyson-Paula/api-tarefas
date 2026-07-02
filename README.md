# api-tarefas

API REST de gerenciamento de tarefas com autenticação JWT e banco de dados PostgreSQL, construída com Node.js e Express.

## Tecnologias

- Node.js
- Express
- JSON Web Token (JWT)
- bcryptjs
- Prisma ORM
- PostgreSQL
- Nodemon

## Como rodar

git clone https://github.com/Karllyson-Paula/api-tarefas.git
cd api-tarefas
npm install

Configure o `.env` com sua conexão do PostgreSQL:

DATABASE_URL="postgresql://postgres:SUA_SENHA@localhost:5432/api_tarefas?schema=public"

Rode as migrações e inicie o servidor:

npx prisma migrate dev
npm run dev

## Autenticação

A API usa JWT. Para acessar as rotas protegidas:

1. Cadastre um usuário em `POST /auth/cadastro`
2. Faça login em `POST /auth/login` e copie o token
3. Adicione no header de cada requisição: `Authorization: Bearer SEU_TOKEN`

## Endpoints

### Públicos
| Método | Rota | Descrição |
|--------|------|-----------|
| POST | /auth/cadastro | Cria novo usuário |
| POST | /auth/login | Retorna token JWT |

### Protegidos (requer token)
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | /tarefas | Lista tarefas do usuário logado |
| GET | /tarefas/:id | Busca tarefa por ID |
| POST | /tarefas | Cria nova tarefa |
| PUT | /tarefas/:id | Atualiza uma tarefa |
| DELETE | /tarefas/:id | Deleta uma tarefa |

## Estrutura

```
api-tarefas/
  controllers/
    authController.js    ← autenticação
    tarefasController.js ← CRUD de tarefas
  middlewares/
    autenticar.js        ← verificação JWT
    logger.js            ← log de requisições
    erros.js             ← tratamento de erros
  prisma/
    schema.prisma        ← modelos do banco
    client.js            ← instância do Prisma
  routes/
    auth.js              ← rotas públicas
    tarefas.js           ← rotas protegidas
  index.js               ← servidor
  ```
