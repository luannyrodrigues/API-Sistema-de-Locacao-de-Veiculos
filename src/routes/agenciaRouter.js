const express = require("express");
const agenciaRouter = express.Router();
const agenciaController = require("../controllers/agenciaController");

agenciaRouter.get(
    //#swagger.summary = 'Listar todas as agências'
    // #swagger.tags = ['Agência']
    "/agencia", agenciaController.getAllAgencias
);
agenciaRouter.get(
    // #swagger.tags = ['Agência']
    //#swagger.summary = 'Obter detalhes de uma agência'
    "/agencia/:id", agenciaController.getAgenciaById
);
agenciaRouter.post(
    //#swagger.summary = 'Cadastrar nova agência'
    // #swagger.tags = ['Agência']
    "/agencia", agenciaController.addAgencia

);
agenciaRouter.delete(
    //#swagger.summary = 'Excluir registro de agência'
    // #swagger.tags = ['Agência']
    "/agencia/:id", agenciaController.deleteAgencia
);

module.exports = agenciaRouter;
