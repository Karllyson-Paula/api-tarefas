# api-tarefas

API REST de gerenciamento de tarefas com autenticação JWT, construída com Node.js e Express.

## Tecnologias

- Node.js
- Express
- JSON Web Token (JWT)
- bcryptjs
- Nodemon

## Como rodar

```bash
git clone https://github.com/Karllyson-Paula/api-tarefas.git
cd api-tarefas
npm install
npm run dev
```

## Autenticação

A API usa JWT. Para acessar as rotas protegidas:

1. Cadastre um usuário em `POST /auth/cadastro`
2. Faça login em `POST /auth/login` e copie o token
3. Adicione no header de cada requisição:
   `Authorization: Bearer SEU_TOKEN`

## Endpoints

### Públicos
| Método | Rota | Descrição |
|--------|------|-----------|
| POST | /auth/cadastro | Cria novo usuário |
| POST | /auth/login | Retorna token JWT |

### Protegidos (requer token)
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | /tarefas | Lista todas as tarefas |
| GET | /tarefas/:id | Busca tarefa por ID |
| POST | /tarefas | Cria nova tarefa |
| PUT | /tarefas/:id | Atualiza uma tarefa |
| DELETE | /tarefas/:id | Deleta uma tarefa |

## Estrutura

```
api-tarefas/
  controllers/
    authController.js    ← lógica de autenticação
    tarefasController.js ← lógica das tarefas
  middlewares/
    autenticar.js        ← verificação do token JWT
    logger.js            ← log de requisições
    erros.js             ← tratamento de erros
  routes/
    auth.js              ← rotas públicas
    tarefas.js           ← rotas protegidas
  index.js               ← servidor
```