const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Carro = sequelize.define(
"tbl_carros", 
{
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  modelo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  placa: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, 
  },
  km_atual: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  status: {
    type: DataTypes.ENUM("disponivel", "alugado", "manutencao"),
    defaultValue: "disponivel",
  },

  agenciaId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "tbl_agencias", 
      key: "id",
    },
  },
},
  {
    timestamps: false
  }
);

module.exports = Carro;