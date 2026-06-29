const express = require('express')
const router = express.Router()
const controller = require('../controllers/tarefasController')
const autenticar = require('../middlewares/autenticar')

router.get('/', autenticar, controller.listarTodas)
router.get('/:id', autenticar, controller.buscarPorId)
router.post('/', autenticar, controller.criar)
router.put('/:id', autenticar, controller.atualizar)
router.delete('/:id', autenticar, controller.deletar)

module.exports = router