const erros = (err, req, res, next) => {
    console.error(err.message)

    const status = err.status || 500
    const mensagem = err.message || 'Erro interno do servidor'

    res.status(status).json({ erro: mensagem })
}

module.exports = erros