const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Pessoa = sequelize.define(
  "tbl_pessoas",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING, allowNull: false
    },
    email: {
      type: DataTypes.STRING, allowNull: false
    },
    senha: {
      type: DataTypes.STRING, allowNull: false
    },
    cpf: {
      type: DataTypes.STRING, allowNull: false
    }
  },
  {
    timestamps: false
  }
);

module.exports = Pessoa;
