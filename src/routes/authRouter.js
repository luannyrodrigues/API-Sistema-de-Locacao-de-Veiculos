const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/authController");

authRouter.post("/login", 
// #swagger.description = 'Valida as credenciais do usuário e gera um token com validade de 30 minutos.'
// #swagger.tags = ['Login']   
// #swagger.summary = 'Realizar login' 
authController.login);


module.exports = authRouter;