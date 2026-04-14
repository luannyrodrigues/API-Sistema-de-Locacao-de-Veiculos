const pessoaService = require("../services/pessoaService");

const PessoaController = {
  async addPessoa(req, res) {
    try {
      const { nome, email, senha, cpf, tipo } = req.body;
      const newPessoa = await pessoaService.createPessoa(nome, email, senha, cpf, tipo);
      return res.status(201).json(newPessoa);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  async getAllPessoas(req, res) {
    try {
      if (req.usuarioTipo !== 'admin') {
        return res.status(403).json({ error: "Acesso negado. Apenas administradores podem listar todos os usuários." });
      }
      const result = await pessoaService.listAll();
      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  async getPessoaById(req, res) {
    try {
      const { id } = req.params;
      const idLogado = req.usuarioId;
      const tipoLogado = req.usuarioTipo;

      if (tipoLogado !== 'admin' && id != idLogado) {
        return res.status(403).json({ error: "Acesso negado. Você só pode visualizar seus próprios dados." });
      }

      const result = await pessoaService.getById(id);
      return res.status(200).json(result);
    } catch (err) {
      return res.status(404).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const idLogado = req.usuarioId;
      const tipoLogado = req.usuarioTipo;

      if (tipoLogado !== 'admin' && id != idLogado) {
        return res.status(403).json({ error: "Acesso negado. Você só pode atualizar seus próprios dados." });
      }

      if (tipoLogado !== 'admin') {
        delete req.body.tipo;
      }

      const pessoaAtualizada = await pessoaService.updatePessoa(id, req.body);
      return res.status(200).json(pessoaAtualizada);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async deletePessoa(req, res) {
    try {
      const { id } = req.params;
      const idLogado = req.usuarioId;
      const tipoLogado = req.usuarioTipo;

      if (tipoLogado !== 'admin' && id != idLogado) {
        return res.status(403).json({ error: "Acesso negado. Você só pode excluir sua própria conta." });
      }

      await pessoaService.removePessoa(id);
      return res.status(204).json({ message: "Usuário excluído com sucesso." });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
};

module.exports = PessoaController;