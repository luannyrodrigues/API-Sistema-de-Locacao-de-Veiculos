const pessoaService = require("../services/pessoaService");

const PessoaController = {
  async addPessoa(req, res) {
    try {
      const {nome, email, senha, cpf} = req.body;
      const newPessoa = await pessoaService.createPessoa(nome, email, senha, cpf);
      return res.status(201).json(newPessoa);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  async getAllPessoas(req, res) {
    try {
      const result = await pessoaService.listAll();
      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  async getPessoaById(req, res) {
    try {
      const result = await pessoaService.getById(req.params.id);
      return res.status(200).json(result);
    } catch (err) {
      return res.status(404).json({ error: err.message });
    }
  },

  async deletePessoa(req, res) {
    try {
      await pessoaService.removePessoa(req.params.id);
      return res.status(200).send();
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
};

module.exports = PessoaController;