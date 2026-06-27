let tarefas = [
  { id: 1,  titulo: 'Estudar Node.js', concluida: false},
  { id: 2, titulo: 'Criar API REST', concluida: false}
]

let proximoId = 3

//mecanismos de pesquisa
const listarTodas = (req, res) => {
    res.json(tarefas)
}

const buscarPorId = (req, res) => {
    const id = Number(req.params.id)
    const tarefa = tarefas.find(t => t.id === id)

    if (!tarefas) {
        return res.status(404).json({ erro: 'Tarefa não encontrada' })
    }

    res.json(tarefa)
}

//mecanismos de manutenção
const criar = (req, res) => {
    const { titulo } = req.body

    if (!titulo) {
        return res.status(400).json({ erro: 'Título é obrigatório' })
    }

    const novaTarefa = { id: proximoId++, titulo, concluida: false}
    tarefas.push(novaTarefa)
    res.status(201).json(novaTarefa)
}

const atualizar = (req, res) => {
    const id = Number(req.params.id)
    const tarefa = tarefas.find(t => t.id === id)

    if (!tarefa) {
        return res.status(404).json({ erro: 'Tarefa não encontrada'})
    }

    const { titulo, concluida } = req.body
    if (titulo) tarefa.titulo = titulo
    if (concluida !== undefined) tarefa.concluida = concluida

    res.json(tarefa)
}

const deletar = (req, res) => {
    const id = Number(req.params.id)
    const index = tarefas.findIndex(t => t.id === id)

    if (index === -1) {
        return res.status(404).json({ erro: 'Tarefa não encontrada'})
    }

    tarefas.splice(index, 1)
    res.status(204).send()
}

module.exports = { listarTodas, buscarPorId, criar, atualizar, deletar }