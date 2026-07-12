const express = require('express')
const cors = require('cors')
const tarefasRouter = require('./routes/tarefas')
const authRouter = require('./routes/auth')
const logger = require('./middlewares/logger')
const erros = require('./middlewares/erros')

const app = express()


app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000']
}))

app.use(express.json())
app.use(logger)

app.use('/auth', authRouter)
app.use('/tarefas', tarefasRouter)

app.use(erros)

module.exports = app