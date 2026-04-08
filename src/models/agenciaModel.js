const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Agencia = sequelize.define(
  "tbl_agencias",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING, allowNull: false
    },
    logradouro: {
      type: DataTypes.STRING, allowNull: false
    },
    cidade: {
      type: DataTypes.STRING, allowNull: false
    },
    uf: {
      type: DataTypes.STRING, allowNull: false
    }
  },
  {
    timestamps: false
  }
);

module.exports = Agencia;
