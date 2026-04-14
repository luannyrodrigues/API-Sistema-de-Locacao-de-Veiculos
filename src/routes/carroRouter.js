const express = require("express");
const carroRouter = express.Router();
const carroController = require("../controllers/carroController");

carroRouter.get(
    //#swagger.summary = 'Listar apenas carros disponíveis'
    // #swagger.tags = ['Carro']
    // #swagger.description = 'Retorna uma lista de todos os veículos que possuem o status "disponivel".'
    "/carro/disponiveis", carroController.getCarrosDisponiveis
);

carroRouter.post(
    //#swagger.summary = 'Cadastrar novo veículo'
    // #swagger.tags = ['Carro']
    "/carro", carroController.addCarro
);

carroRouter.get(
    //#swagger.summary = 'Listar todos os carros'
    // #swagger.tags = ['Carro']
    "/carro", carroController.getAllCarros
);

carroRouter.get(
    //#swagger.summary = 'Obter detalhes de um carro'
    // #swagger.tags = ['Carro']
    "/carro/:id", carroController.getCarroById
);

carroRouter.put(
    "/carro/:id",
    // #swagger.tags = ['Carro']
    // #swagger.summary = 'Atualizar dados de um veículo'
    // #swagger.description = 'Permite alterar modelo, placa, km_atual e status do veículo.'
    carroController.updateCarro
);

carroRouter.delete(
    //#swagger.summary = 'Excluir registro de carro'
    // #swagger.tags = ['Carro']
    "/carro/:id", carroController.deleteCarro
);

module.exports = carroRouter;