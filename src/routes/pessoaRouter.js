const express = require("express");
const pessoaRouter = express.Router();
const pessoaController = require("../controllers/pessoaController");

pessoaRouter.get(
    //#swagger.summary = 'Listar clientes cadastrados'
    // #swagger.tags = ['Pessoa']
    "/pessoa", pessoaController.getAllPessoas
);
pessoaRouter.get(
    //#swagger.summary = 'Buscar cliente por ID'
    // #swagger.tags = ['Pessoa']
    "/pessoa/:id", pessoaController.getPessoaById
);
pessoaRouter.post(
    //#swagger.summary = 'Cadastrar novo cliente'
    // #swagger.tags = ['Pessoa']
    "/pessoa", pessoaController.addPessoa

);
pessoaRouter.delete(
    //#swagger.summary = 'Excluir registro de cliente'
    // #swagger.tags = ['Pessoa']
    "/pessoa/:id", pessoaController.deletePessoa
);

module.exports = pessoaRouter;
