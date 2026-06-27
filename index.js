const express = require('express')
const tarefasRouter = require('./routes/tarefas')

const app = express()
const PORT = 3000

app.use(express.json())
app.use('/tarefas', tarefasRouter)


app.listen(PORT, () => {
  console.log(`🚀 Servidor online em http://localhost:${PORT}`)
})
