const jwt = require('jsonwebtoken');

function autenticarToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ msg: 'Token ausente' });

  jwt.verify(token, 'secreta123', (err, user) => {
    if (err) return res.status(403).json({ msg: 'Token inválido' });
    req.user = user;
    next();
  });
}

module.exports = autenticarToken;
