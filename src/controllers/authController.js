const jwt = require('jsonwebtoken');
const Pessoa = require('../models/pessoaModel');

const authController = {
    async login(req, res) {
        try {
            const { email, senha } = req.body;

            const pessoa = await Pessoa.findOne({ where: { email } });
            if (!pessoa || pessoa.senha !== senha) {
                return res.status(401).json({ error: "E-mail ou senha inválidos." });
            }
            const payload = { 
                id: pessoa.id, 
                nome: pessoa.nome,
                email: pessoa.email 
            };

            const token = jwt.sign(payload, process.env.JWT_SECRET || "sua_chave_secreta", {
                expiresIn: '30m'
            });

            return res.status(200).json({
                auth: true,
                token: token,
                user: { nome: pessoa.nome, email: pessoa.email }
            });

        } catch (error) {
            console.error("Erro no login:", error);
            return res.status(500).json({ error: "Erro interno no servidor." });
        }
    }
};

module.exports = authController;