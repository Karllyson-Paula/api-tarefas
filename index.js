const express = require('express')
const tarefasRouter = require('./routes/tarefas')
const authRouter = require('./routes/auth')
const logger = require('./middlewares/logger')
const erros = require('./middlewares/erros')

const app = express()
const PORT = 3000

app.use(express.json())
app.use(logger)

app.use('/auth', authRouter)
app.use('/tarefas', tarefasRouter)

app.use(erros)

app.listen(PORT, () => {
  console.log(`🚀 Servidor online em http://localhost:${PORT}`)
})
