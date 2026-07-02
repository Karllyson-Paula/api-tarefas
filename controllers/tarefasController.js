const prisma = require('../prisma/client')


//mecanismos de filtragem e consulta
const listarTodas = async (req, res) => {
    const tarefas = await prisma.tarefa.findMany({
        where: { usuarioId: req.usuario.id}
    })

    res.json(tarefas)
}

const buscarPorId = async (req, res) => {
    const id = Number(req.params.id)

    const tarefa = await prisma.tarefa.findUnique({ where: { id }
    })

    if (!tarefa ||  tarefa.usuarioId !== req.usuario.id) {
        return res.status(404).json({ erro: 'Tarefa não encontrada' })
    }

    res.json(tarefa)
}

//mecanismos de manutenção

const criar = async (req, res) => {
    const { titulo } = req.body

    if (!titulo) {
        return res.status(400).json({ erro: 'Titulo é obrigatório'})
    }

    const novaTarefa = await prisma.tarefa.create({
        data: {
            titulo,
            usuarioId: req.usuario.id
        }
    })

    res.status(201).json(novaTarefa)
}

const atualizar = async (req, res) => {
        const id = Number(req.params.id)

        const tarefa = await prisma.tarefa.findUnique({ where: { id } })
        
        if (!tarefa || tarefa.usuarioId !== req.usuario.id) {
            return res.status(404).json({ erro: 'Tarefa não encontrada' })
        }
        
        const { titulo, concluida } = req.body

        const tarefaAtualizada = await prisma.tarefa.update({
            where: id,
            data: {
                ...(titulo && {titulo}),
                ...(concluida !== undefined && {concluida})
            }
        })
    
        res.json(tarefaAtualizada)
}

const deletar = async (req, res) => {
        const id = Number(req.params.id)

        const tarefa = await prisma.tarefa.findUnique({ where: { id } })

        if (!tarefa || tarefa.usuarioId !== req.usuario.id) {
            return res.status(404).json({ erro: 'Tarefa não encontrada' })
        }

        await prisma.tarefa.delete({ where: {id} })

        res.status(204).send()
    }


module.exports = { listarTodas, buscarPorId, criar, atualizar, deletar }