require('dotenv').config();
const { sequelize } = require('./models');
const { createAdmin } = require('./services/authService');

sequelize.sync().then(async () => {
  await createAdmin('admin', 'password123');
  console.log('Admin creado exitosamente');
  process.exit();
}).catch((e) => {
  console.error(e);
  process.exit(1);
});