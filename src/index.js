require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { SwaggerTheme, SwaggerThemeNameEnum } = require("swagger-themes");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger/swagger-output.json");

const sequelize = require("./db");
const Pessoa = require("./models/pessoaModel");
const Agencia = require("./models/agenciaModel");
const Carro = require("./models/carroModel");
const Aluguel = require("./models/aluguelModel");

const pessoaRouter = require("./routes/pessoaRouter");
const agenciaRouter = require("./routes/agenciaRouter");
const carroRouter = require("./routes/carroRouter");
const aluguelRouter = require("./routes/aluguelRouter");
const authRouter = require("./routes/authRouter");

const app = express();
const PORT = process.env.PORT || 3000; 

app.use(cors()); 
app.use(express.json());

const theme = new SwaggerTheme();
const swaggerOptions = {
  explorer: true,
  customCss: theme.getBuffer(SwaggerThemeNameEnum.DRACULA),
};
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile, swaggerOptions));

Agencia.hasMany(Carro, { foreignKey: "agenciaId" });
Carro.belongsTo(Agencia, { foreignKey: "agenciaId" });
Aluguel.belongsTo(Pessoa, { foreignKey: "pessoaId" });
Aluguel.belongsTo(Carro, { foreignKey: "carroId" });
Aluguel.belongsTo(Agencia, { 
  as: "AgenciaRetirada", 
  foreignKey: "agenciaRetiradaId" 
});
Aluguel.belongsTo(Agencia, { 
  as: "AgenciaDevolucao", 
  foreignKey: "agenciaDevolucaoId" 
});

app.use("/api", pessoaRouter);
app.use("/api", agenciaRouter);
app.use("/api", carroRouter);
app.use("/api", aluguelRouter);
app.use("/api", authRouter);

async function startApp() {
  try {
    await sequelize.sync({ alter: true });
    console.log("Banco de dados sincronizado.");
    
    app.listen(PORT, () => {
      console.log(`Listening on http://localhost:${PORT}`);
      console.log(`Swagger docs em http://localhost:${PORT}/docs`);
    });
  } catch (err) {
    console.error("Erro ao iniciar banco:", err);
  }
}

startApp();