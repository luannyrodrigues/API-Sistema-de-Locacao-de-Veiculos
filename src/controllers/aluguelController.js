const aluguelService = require("../services/aluguelService");

const AluguelController = {
  async addAluguel(req, res) {
    try {
      const { 
        pessoaId, 
        carroId, 
        agenciaRetiradaId, 
        km_inicial, 
        data_retirada 
      } = req.body;

      const newAluguel = await aluguelService.realizarRetirada(
        pessoaId,
        carroId,
        agenciaRetiradaId,
        km_inicial,
        data_retirada
      );

      return res.status(201).json(newAluguel);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  },

  async finalizarAluguel(req, res) {
    try {
      const {id} = req.params; 
      const {agenciaDevolucaoId, km_final, valor_total} = req.body;

      const result = await aluguelService.realizarDevolucao(
        id,
        agenciaDevolucaoId,
        km_final,
        valor_total
      );

      return res.status(200).json(result);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  },

  async getAllAlugueis(req, res) {
    try {
      const result = await aluguelService.listarTodos();
      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  async getAluguelById(req, res) {
    try {
      const result = await aluguelService.buscarPorId(req.params.id);
      return res.status(200).json(result);
    } catch (err) {
      return res.status(404).json({ error: err.message });
    }
  },

  async deleteAluguel(req, res) {
    try {
      const { id } = req.params;
      
      const result = await aluguelService.excluirAluguel(id);

      return res.status(204).json(result);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
};

module.exports = AluguelController;