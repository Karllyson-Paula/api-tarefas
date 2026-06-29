const jwt = require('jsonwebtoken')
const { SEGREDO } = require('../controllers/authController')

const autenticar = (req, res, next ) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ erro: 'Token não fornecido '})
    }

    const token = authHeader.split(' ')[1]

    try {
        const dados = jwt.verify(token, SEGREDO)
        req.usuario = dados
        next()
    } catch(erro) {
        return res.status(401).json({ erro: 'Token inválido ou expirado'})
    }
}

module.exports = autenticar