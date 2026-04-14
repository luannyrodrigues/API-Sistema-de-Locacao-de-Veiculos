const express = require("express");
const aluguelRouter = express.Router();
const aluguelController = require("../controllers/aluguelController");
const { verificarToken, verificarAdmin } = require('../middlewares/authMiddleware');

aluguelRouter.get(
    "/aluguel",
    //#swagger.summary = 'Listar todos os aluguéis'
    // #swagger.tags = ['Aluguel']
     aluguelController.getAllAlugueis
);

aluguelRouter.post(
    "/aluguel", 
    [verificarToken, verificarAdmin], 
    // #swagger.summary = 'Realizar retirada de veículo'
    // #swagger.tags = ['Aluguel']
    // #swagger.description = 'Cria um novo registro de aluguel com status "aberto". Esta operação valida se o carro e o cliente existem e se o veículo está com status "disponivel". Após a criação, o status do veículo é alterado automaticamente para "alugado".'
    // #swagger.security = [{ "apiKeyAuth": [] }]
    aluguelController.addAluguel
);

aluguelRouter.put(
    "/aluguel/finalizar/:id",
    [verificarToken, verificarAdmin],
    //#swagger.summary = 'Registrar devolução de veículo'
    // #swagger.tags = ['Aluguel']
    // #swagger.description = 'Encerra um contrato de aluguel ativo. A rota calcula (ou recebe) o KM final e o valor total. Ao finalizar, o status do contrato muda para "finalizado", a agência de devolução é registrada e o veículo retorna ao status "disponivel", atualizando sua quilometragem atual.'
    // #swagger.security = [{ "apiKeyAuth": [] }]
    aluguelController.finalizarAluguel
);

aluguelRouter.get(
    "/aluguel/:id",
    //#swagger.summary = 'Obter detalhes de um aluguel'
    // #swagger.tags = ['Aluguel']
     aluguelController.getAluguelById
);

aluguelRouter.delete(
    "/aluguel/:id",
    [verificarToken, verificarAdmin], 
    //#swagger.tags = ['Aluguel']
    //#swagger.summary = 'Excluir registro de aluguel'
    //#swagger.description = 'Exclui o registro de aluguel do banco de dados. Caso o aluguel ainda esteja com status "aberto", o sistema realiza o estorno do status do veículo associado para "disponivel" antes de deletar o contrato.'
    // #swagger.security = [{ "apiKeyAuth": [] }]
    aluguelController.deleteAluguel
);

module.exports = aluguelRouter;