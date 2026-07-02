const request = require('supertest')
const app = require('../index')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

// limpeza do banco antes de cada teste
beforeEach(async () => {
    await prisma.tarefa.deleteMany()
    await prisma.usuario.deleteMany()
})

// encerramento de conexão após cada teste
afterAll(async () => {
    await prisma.$disconnect()
})

describe('POST /auth/cadastro', () => {
    it('Deve cadastrar usuario com sucesso', async () => {
        const res = await request(app)
            .post('/auth/cadastro')
            .send({
                nome: 'Karllyson',
                email: 'bilo@test.com',
                senha: '123456'
            })

            expect(res.status).toBe(201)
            expect(res.body).toHaveProperty('mensagem')
            expect(res.body).toHaveProperty('id')
    })

    it('Deve rejeitar cadastro sem nome', async () => {
        const res = await request(app)
            .post('/auth/cadastro')
            .send({
                email: 'bilo@test.com',
                senha: '123456'
            })

            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty('erro')
    })

    it('Deve rejeitar email duplicado', async () => {
        await request(app)
            .post('/auth/cadastro')
            .send({
                nome: 'Karllyson',
                email: 'bilo@test.com',
                senha: '123456'
            })

        const res = await request(app)
            .post('/auth/cadastro')
            .send({
                nome: 'Karllyson',
                email: 'bilo@test.com',
                senha: '123456'
            })

        expect(res.status).toBe(400)
        expect(res.body.erro).toBe('Email já cadastrado')

    })
})

describe('POST /auth/login', () => {
    it('Deve logar com credenciais corretas', async () => {
        await request(app)
            .post('/auth/cadastro')
            .send({
                nome: 'Karllyson',
                email: 'bilo@test.com',
                senha: '123456'
            })

        const res = await request(app)
            .post('/auth/login')
            .send({
                email: 'bilo@test.com',
                senha: '123456'
            })

        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('token')
    })

    it('Deve rejeitar senha incorreta', async () => {
        await request(app)
            .post('/auth/cadastro')
            .send({
                nome: 'Karllyson',
                email: 'bilo@test.com',
                senha: '123456'
            })

        const res = await request(app)
            .post('/auth/login')
            .send({
                email: 'bilo@test.com',
                senha: 'senhaerrada'
            })

        expect(res.status).toBe(401)
        expect(res.body).toHaveProperty('erro')
    })
})