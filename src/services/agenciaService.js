const Agencia = require("../models/agenciaModel");

class AgenciaService {
  async createAgencia(nome, logradouro, cidade, uf) {
    return await Agencia.create({nome, logradouro, cidade, uf});
  }

  async listAll() {
    return await Agencia.findAll();
  }

  async getById(id) {
    const agencia = await Agencia.findByPk(id);
    if (!agencia) throw new Error("Agencia não encontrada");
    return agencia;
  }

  async updateAgencia(id, dadosAtualizados) {
    const agencia = await Agencia.findByPk(id);
    if (!agencia) throw new Error("Agência não encontrada");

    return await agencia.update(dadosAtualizados);
  }

  async removeAgencia(id) {
    return await Agencia.destroy({ where: { id } });
  }
}

module.exports = new AgenciaService();