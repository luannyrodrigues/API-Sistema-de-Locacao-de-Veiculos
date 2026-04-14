const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;

function verificarToken(req, res, next) {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ error: "Token não fornecido." });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) {
            console.log("Erro detalhado do JWT:", err.message); 
            return res.status(403).json({ error: "Token inválido." });
        }
        
        req.usuarioId = decoded.id;
        req.usuarioTipo = decoded.tipo; 
        next();
    });
}

function verificarAdmin(req, res, next) {
    if (req.usuarioTipo !== 'admin') {
        return res.status(403).json({ error: "Acesso negado. Rota exclusiva para administradores." });
    }
    next();
}

module.exports = { verificarToken, verificarAdmin };