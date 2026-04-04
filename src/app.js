require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const morgan  = require('morgan');
const { sequelize } = require('./models');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api', require('./routes'));

app.get('/', (req, res) => res.json({ status: 'ok', api: 'Basketball League API' }));

const PORT = process.env.PORT || 3000;

sequelize.sync({ alter: true }).then(() => {
  console.log('Base de datos sincronizada');
  app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
}).catch(console.error);