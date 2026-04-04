const authService = require('../services/authService');

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({ error: 'Usuario y contraseña requeridos' });
    const token = await authService.login(username, password);
    res.json({ token });
  } catch (e) {
    res.status(401).json({ error: e.message });
  }
};

module.exports = { login };