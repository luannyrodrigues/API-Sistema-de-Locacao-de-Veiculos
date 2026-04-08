const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.BD_NOME, process.env.BD_USUARIO, process.env.BD_SENHA, {
  host: process.env.BD_HOST,
  dialect: "postgres",
  port: process.env.BD_PORT
});

module.exports = sequelize;
