const agenciaService = require("../services/agenciaService");

const AgenciaController = {
  async addAgencia(req, res) {
    try {
      const {nome, logradouro, cidade, uf} = req.body;
      const newAgencia = await agenciaService.createAgencia(nome, logradouro, cidade, uf);
      return res.status(201).json(newAgencia);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  async getAllAgencias(req, res) {
    try {
      const result = await agenciaService.listAll();
      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  async getAgenciaById(req, res) {
    try {
      const result = await agenciaService.getById(req.params.id);
      return res.status(200).json(result);
    } catch (err) {
      return res.status(404).json({ error: err.message });
    }
  },

  async updateAgencia(req, res) {
    try {
      const { id } = req.params;
      const dados = req.body;
      const agenciaAtualizada = await agenciaService.updateAgencia(id, dados);
      
      return res.status(200).json(agenciaAtualizada);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async deleteAgencia(req, res) {
    try {
      await agenciaService.removeAgencia(req.params.id);
      return res.status(204).send();
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
};

module.exports = AgenciaController;