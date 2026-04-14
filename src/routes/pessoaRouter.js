const express = require("express");
const pessoaRouter = express.Router();
const pessoaController = require("../controllers/pessoaController");
const { verificarToken, verificarAdmin } = require('../middlewares/authMiddleware');

pessoaRouter.get(
    "/pessoa", 
    verificarToken,
    // #swagger.tags = ['Pessoa']
    // #swagger.summary = 'Listar todos os usuários cadastrados'
    // #swagger.description = 'Apenas administradores podem listar todos os usuários.'
    // #swagger.security = [{ "apiKeyAuth": [] }]
    pessoaController.getAllPessoas
);

pessoaRouter.get(
    "/pessoa/:id", 
    verificarToken,
    // #swagger.tags = ['Pessoa']
    // #swagger.summary = 'Buscar usuário por ID'
    // #swagger.description = 'Usuários podem ver seus próprios dados ou Admins podem ver de qualquer um.'
    // #swagger.security = [{ "apiKeyAuth": [] }]
    pessoaController.getPessoaById
);

pessoaRouter.post(
    "/pessoa", 
    // #swagger.tags = ['Pessoa']
    // #swagger.summary = 'Cadastrar novo usuário'
    pessoaController.addPessoa
);

pessoaRouter.put(
    "/pessoa/:id", 
    verificarToken, 
    // #swagger.tags = ['Pessoa']
    // #swagger.summary = 'Atualizar dados de um usuário'
    // #swagger.description = 'Clientes podem atualizar seus próprios dados. Admins podem atualizar qualquer usuário.'
    // #swagger.security = [{ "apiKeyAuth": [] }]
    pessoaController.update
);

pessoaRouter.delete(
    "/pessoa/:id", 
    verificarToken,
    // #swagger.tags = ['Pessoa']
    // #swagger.summary = 'Excluir registro de usuário'
    // #swagger.security = [{ "apiKeyAuth": [] }]
    pessoaController.deletePessoa
);

module.exports = pessoaRouter;