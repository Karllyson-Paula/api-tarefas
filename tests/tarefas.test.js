const request = require('supertest')
const app = require('../index')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

let token

// Limpa o banco e cria usuário antes de cada teste
beforeEach(async () => {
  await prisma.tarefa.deleteMany()
  await prisma.usuario.deleteMany()

  // Cadastra e loga para pegar o token
  await request(app)
    .post('/auth/cadastro')
    .send({ nome: 'Karllyson', email: 'bilo@test.com', senha: '123456' })

  const res = await request(app)
    .post('/auth/login')
    .send({ email: 'bilo@test.com', senha: '123456' })

  token = res.body.token
})

afterAll(async () => {
  await prisma.$disconnect()
})

describe('POST /tarefas', () => {
  it('deve criar uma tarefa com sucesso', async () => {
    const res = await request(app)
      .post('/tarefas')
      .set('Authorization', `Bearer ${token}`)
      .send({ titulo: 'Estudar Jest' })

    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty('id')
    expect(res.body.titulo).toBe('Estudar Jest')
  })

  it('deve rejeitar tarefa sem título', async () => {
    const res = await request(app)
      .post('/tarefas')
      .set('Authorization', `Bearer ${token}`)
      .send({})

    expect(res.status).toBe(400)
    expect(res.body).toHaveProperty('erro')
  })

  it('deve rejeitar requisição sem token', async () => {
    const res = await request(app)
      .post('/tarefas')
      .send({ titulo: 'Sem token' })

    expect(res.status).toBe(401)
  })
})

describe('GET /tarefas', () => {
  it('deve listar tarefas do usuário logado', async () => {
    await request(app)
      .post('/tarefas')
      .set('Authorization', `Bearer ${token}`)
      .send({ titulo: 'Tarefa 1' })

    const res = await request(app)
      .get('/tarefas')
      .set('Authorization', `Bearer ${token}`)

    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
    expect(res.body.length).toBe(1)
  })
})

describe('DELETE /tarefas/:id', () => {
  it('deve deletar uma tarefa com sucesso', async () => {
    const criada = await request(app)
      .post('/tarefas')
      .set('Authorization', `Bearer ${token}`)
      .send({ titulo: 'Deletar essa' })

    const res = await request(app)
      .delete(`/tarefas/${criada.body.id}`)
      .set('Authorization', `Bearer ${token}`)

    expect(res.status).toBe(204)
  })
})