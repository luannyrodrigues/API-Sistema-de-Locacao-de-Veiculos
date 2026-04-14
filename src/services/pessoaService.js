const Pessoa = require("../models/pessoaModel");

class PessoaService {
  async createPessoa(nome, email, senha, cpf, tipo) {
    return await Pessoa.create({nome, email, senha, cpf, tipo});
  }

  async listAll() {
    return await Pessoa.findAll();
  }

  async getById(id) {
    const pessoa = await Pessoa.findByPk(id);
    if (!pessoa) throw new Error("Pessoa não encontrada");
    return pessoa;
  }

  async updatePessoa(id, dadosAtualizados) {
    const pessoa = await Pessoa.findByPk(id);
    if (!pessoa) throw new Error("Usuário não encontrado.");
    return await pessoa.update(dadosAtualizados);
  }

  async removePessoa(id) {
    return await Pessoa.destroy({ where: { id } });
  }
}

module.exports = new PessoaService();