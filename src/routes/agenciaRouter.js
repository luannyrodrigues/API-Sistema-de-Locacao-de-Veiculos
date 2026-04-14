const express = require("express");
const agenciaRouter = express.Router();
const agenciaController = require("../controllers/agenciaController");
const { verificarToken, verificarAdmin } = require('../middlewares/authMiddleware');

agenciaRouter.get(
    "/agencia",
    //#swagger.summary = 'Listar todas as agências'
    // #swagger.tags = ['Agência']
    agenciaController.getAllAgencias
);
agenciaRouter.get(
    "/agencia/:id",
    // #swagger.tags = ['Agência']
    //#swagger.summary = 'Obter detalhes de uma agência'
     agenciaController.getAgenciaById
);
agenciaRouter.post(
    "/agencia",
    [verificarToken, verificarAdmin],
    //#swagger.summary = 'Cadastrar nova agência'
    // #swagger.tags = ['Agência']
    agenciaController.addAgencia

);

agenciaRouter.put(
    "/agencia/:id", 
    [verificarToken, verificarAdmin], 
    // #swagger.tags = ['Agência']
    // #swagger.summary = 'Atualizar dados de uma agência'
    // #swagger.description = 'Altera informações como nome, logradouro ou cidade de uma agência específica.'
    // #swagger.security = [{ "apiKeyAuth": [] }]
    agenciaController.updateAgencia
);

agenciaRouter.delete(
    "/agencia/:id",
    [verificarToken, verificarAdmin],
    //#swagger.summary = 'Excluir registro de agência'
    // #swagger.tags = ['Agência']
    agenciaController.deleteAgencia
);

module.exports = agenciaRouter;
