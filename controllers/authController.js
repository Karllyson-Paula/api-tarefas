const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const SEGREDO = 'minha-chave-secreta-dev'

const usuarios = []

const cadastrar = async (req, res) => {
    const { nome, email, senha } = req.body

    if (!nome || !email || !senha) {
        return res.status(400).json({ erro: 'Nome, email e senha são obrigatórios'})
    }

    const jaExiste = usuarios.find(u => u.email === email)
    if (jaExiste) {
        return res.status(400).json({ erro: 'Email já cadastrado '})
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10)

    const novoUsuario = {
        id: usuarios.length + 1,
        nome,
        email,
        senha: senhaCriptografada
    }

    usuarios.push(novoUsuario)

    res.status(201).json({ mensagem: 'Usuario criado com sucesso!', id: novoUsuario.id })
}

const login = async (req, res) => {
    const { email, senha } = req.body

    if (!email || !senha ) {
        return res.status(400).json({ erro: 'Email e senha são obrigatórios' })
    }

    const usuario = usuarios.find(u => u.email === email)
    if (!usuario) {
        return res.status(401).json({ erro: 'Credenciais inválidas' })
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha)
    if (!senhaCorreta) {
        return res.status(401).json({ erro: 'Credenciais inválidas' })
    }

    const token = jwt.sign(
        { id: usuario.id, email: usuario.email },
        SEGREDO,
        { expiresIn: '1d'}
    )

    res.json({ token })
}

module.exports = { cadastrar, login, SEGREDO }