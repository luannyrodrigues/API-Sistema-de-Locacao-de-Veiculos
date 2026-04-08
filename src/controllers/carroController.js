const carroService = require("../services/carroService");

const CarroController = {
  async addCarro(req, res) {
    try {
      const { modelo, placa, km_atual, status, agenciaId } = req.body;
      
      const newCarro = await carroService.createCarro(
        modelo, 
        placa, 
        km_atual, 
        status, 
        agenciaId
      );
      
      return res.status(201).json(newCarro);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  },

  async getAllCarros(req, res) {
    try {
      const result = await carroService.listarTodos();
      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  async getCarrosDisponiveis(req, res) {
    try {
      const result = await carroService.listarDisponiveis();
      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  async getCarroById(req, res) {
    try {
      const result = await carroService.buscarPorId(req.params.id);
      return res.status(200).json(result);
    } catch (err) {
      return res.status(404).json({ error: err.message });
    }
  },

  async updateCarro(req, res) {
        try {
            const { id } = req.params;
            const dados = req.body;

            const carroAtualizado = await carroService.atualizarCarro(id, dados);

            return res.status(200).json(carroAtualizado);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    },

  async deleteCarro(req, res) {
    try {
      await carroService.removeCarro(req.params.id);
      return res.status(204).send(); 
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
};

module.exports = CarroController;