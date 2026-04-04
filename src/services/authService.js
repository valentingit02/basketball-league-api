const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Admin } = require('../models');

const login = async (username, password) => {
  const admin = await Admin.findOne({ where: { username } });
  if (!admin) throw new Error('Credenciales incorrectas');

  const valid = await bcrypt.compare(password, admin.password);
  if (!valid) throw new Error('Credenciales incorrectas');

  return jwt.sign({ id: admin.id, username }, process.env.JWT_SECRET, { expiresIn: '8h' });
};

const createAdmin = async (username, password) => {
  const hashed = await bcrypt.hash(password, 10);
  return Admin.create({ username, password: hashed });
};

module.exports = { login, createAdmin };