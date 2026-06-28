# api-tarefas


API REST de gerenciamento de tarefasconstrída com Node.js e Express.

## Tecnologias 

- Node.js
- Express
- Nodemon

## Como rodar
```bash
git clone https://github.com/Karllyson-Paula/api-tarefas.git
cd api-tarefas
npm install
npm run dev
```

## Endpoints

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
  index.js                        ← servidor
  routes/tarefas.js               ← rotas
  controllers/tarefasController.js ← lógica
```
