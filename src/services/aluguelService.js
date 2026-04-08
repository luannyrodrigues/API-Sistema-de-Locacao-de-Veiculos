const Aluguel = require("../models/aluguelModel");
const Carro = require("../models/carroModel");
const Pessoa = require("../models/pessoaModel");
const Agencia = require("../models/agenciaModel");

class AluguelService {
    async realizarRetirada(pessoaId, carroId, agenciaRetiradaId, km_inicial, data_retirada) {
    
    const carro = await Carro.findByPk(carroId);
    if (!carro) throw new Error("Carro não encontrado.");
    if (carro.status !== "disponivel") {
        throw new Error("Este veículo não está disponível para locação.");
    }

    const pessoaExiste = await Pessoa.findByPk(pessoaId);
    if (!pessoaExiste) throw new Error("Cliente não encontrado.");

    const agenciaExiste = await Agencia.findByPk(agenciaRetiradaId);
    if (!agenciaExiste) throw new Error("Agência de retirada não encontrada.");

    try {
        const novoAluguel = await Aluguel.create({
        pessoaId,
        carroId,
        agenciaRetiradaId,
        km_inicial: km_inicial || carro.km_atual,
        data_retirada: data_retirada || new Date(), 
        status: "aberto"
    });

    await carro.update({ status: "alugado" });

    return novoAluguel;
  } catch (error) {
    console.error("Erro ao realizar retirada:", error);
    throw new Error("Erro interno ao processar a locação.");
  }
}

  async realizarDevolucao(aluguelId, agenciaDevolucaoId, km_final, valor_total) {
    const aluguel = await Aluguel.findByPk(aluguelId);
    if (!aluguel) throw new Error("Contrato de aluguel não encontrado.");
    if (aluguel.status === "finalizado") throw new Error("Este aluguel já foi encerrado.");

    try {
      await aluguel.update({
        agenciaDevolucaoId,
        km_final,
        valor_total,
        data_devolucao: new Date(),
        status: "finalizado"
      });

      const carro = await Carro.findByPk(aluguel.carroId);
      await carro.update({ 
        status: "disponivel",
        km_atual: km_final 
      });

      return aluguel;
    } catch (error) {
      console.error("Erro ao realizar devolução:", error);
      throw new Error("Erro interno ao processar a devolução.");
    }
  }

  async listarTodos() {
    return await Aluguel.findAll({
      include: [
        { model: Pessoa, attributes: ['nome'] },
        { model: Carro, attributes: ['modelo', 'placa'] }
      ]
    });
  }

  async buscarPorId(id) {
    const result = await Aluguel.findByPk(id, { include: { all: true } });
    if (!result) throw new Error("Aluguel não encontrado.");
    return result;
  }

async excluirAluguel(id) {
    const aluguel = await Aluguel.findByPk(id);
    
    if (!aluguel) {
      throw new Error("Aluguel não encontrado para exclusão.");
    }

    try {
      if (aluguel.status === "aberto") {
        const carro = await Carro.findByPk(aluguel.carroId);
        if (carro) {
          await carro.update({ status: "disponivel" });
        }
      }

      await aluguel.destroy();
      
      return { message: "Registro de aluguel excluído com sucesso." };
    } catch (error) {
      console.error("Erro ao excluir aluguel:", error);
      throw new Error("Erro interno ao excluir o registro.");
    }
  }
}

module.exports = new AluguelService();