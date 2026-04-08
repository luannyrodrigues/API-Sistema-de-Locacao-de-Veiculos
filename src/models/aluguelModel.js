const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Aluguel = sequelize.define("tbl_alugueis", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  data_retirada: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  data_devolucao: { type: DataTypes.DATE, allowNull: true },
  km_inicial: { type: DataTypes.INTEGER, allowNull: false },
  km_final: { type: DataTypes.INTEGER, allowNull: true },
  valor_total: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
  status: { 
    type: DataTypes.ENUM("aberto", "finalizado", "cancelado"), 
    defaultValue: "aberto" 
  },
  pessoaId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "tbl_pessoas", 
      key: "id"
    }
  },

  carroId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "tbl_carros",
      key: "id"
    }
  },

  agenciaRetiradaId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "tbl_agencias",
      key: "id"
    }
  },

  agenciaDevolucaoId: {
    type: DataTypes.INTEGER,
    allowNull: true, 
    references: {
      model: "tbl_agencias",
      key: "id"
    }
},
},
  {
    timestamps: false
  }
);

module.exports = Aluguel;