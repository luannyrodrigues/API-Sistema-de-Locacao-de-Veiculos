// https://swagger-autogen.github.io/docs/endpoints/

const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });

const doc = {
  info: {
    version: "1.0.0",
    title: "API para aluguel de carros",
    description: "API para a disciplina de Serviços Web",
  },
  servers: [
    {
      url: `http://localhost:${process.env.PORT}`,
      // description: "Local development server",
    },
  ],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["../routes/pessoaRouter.js", 
  "../routes/agenciaRouter.js", 
  "../routes/carroRouter.js",
  "../routes/aluguelRouter.js",
  "../routes/authRouter.js"];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require("../index");
});