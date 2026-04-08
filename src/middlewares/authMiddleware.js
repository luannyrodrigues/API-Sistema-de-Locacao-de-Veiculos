const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;

function verificarToken(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ error: "Token não fornecido." });
    }

    const splitToken = token.split(' ')[1];

    jwt.verify(splitToken, SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: "Token inválido ou expirado." });
        }

        req.usuarioId = decoded.id;
        next(); 
    });
}

module.exports = verificarToken;