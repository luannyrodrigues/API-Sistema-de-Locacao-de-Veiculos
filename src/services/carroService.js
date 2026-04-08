const Carro = require("../models/carroModel");
const Agencia = require("../models/agenciaModel");

class CarroService {
  async createCarro(modelo, placa, km_atual, status, agenciaId) {

    const placaExistente = await Carro.findOne({ where: { placa } });
    if (placaExistente) {
      throw new Error("Já existe um veículo cadastrado com esta placa.");
    }

    const agenciaExiste = await Agencia.findByPk(agenciaId);
    if (!agenciaExiste) {
      throw new Error("A agência informada não existe.");
    }

    try {
      const novoCarro = await Carro.create({
        modelo,
        placa,
        km_atual: km_atual || 0, 
        status: status || "disponivel",
        agenciaId
      });

    return novoCarro;
    } catch (error) {
      console.error("Erro técnico ao criar carro:", error);
      throw new Error("Erro interno ao salvar o veículo.");
}

}

  async listarTodos() {
    return await Carro.findAll();
  }

  async listarDisponiveis() {
    return await Carro.findAll({ where: { status: "disponivel" } });
  }

  async buscarPorId(id) {
    const carro = await Carro.findByPk(id);
    if (!carro) throw new Error("Carro não encontrado");
    return carro;
  }

    async atualizarCarro(id, dadosAtualizados) {
        const carro = await Carro.findByPk(id);
        
        if (!carro) {
            throw new Error("Veículo não encontrado.");
        }

        try {
            // O Sequelize ignora campos do objeto que não existem na tabela
            await carro.update(dadosAtualizados);
            return carro;
        } catch (error) {
            console.error("Erro ao atualizar carro:", error);
            throw new Error("Erro interno ao atualizar os dados do veículo.");
        }
    }

  async removeCarro(id) {
      return await Carro.destroy({ where: { id } });
    }
}

module.exports = new CarroService();