const Pessoa = require("../models/pessoaModel");

class PessoaService {
  async createPessoa(nome, email, senha, cpf) {
    return await Pessoa.create({nome, email, senha, cpf});
  }

  async listAll() {
    return await Pessoa.findAll();
  }

  async getById(id) {
    const pessoa = await Pessoa.findByPk(id);
    if (!pessoa) throw new Error("Pessoa não encontrada");
    return pessoa;
  }

  async removePessoa(id) {
    return await Pessoa.destroy({ where: { id } });
  }
}

module.exports = new PessoaService();