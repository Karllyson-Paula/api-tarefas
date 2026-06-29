const logger = (req, res, next) => {
    const agora = new Date().toLocaleDateString('pt-BR')
    console.log(`[${agora}] ${req.method} ${req.url}`)
    next()
}

module.exports = logger