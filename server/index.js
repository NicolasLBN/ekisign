const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const app = express();
const port = 3000;

const sequelize = new Sequelize('ekisign', 'postgres', 'root', {
  host: 'localhost',
  dialect: 'postgres'
});

const User = require('./models/user')(sequelize, DataTypes);

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Synchroniser tous les modèles
sequelize.sync()
  .then(() => {
    console.log('Database & tables created!');
  });

app.get('/test', (req, res) => {
  res.send('Hello world!');

});



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});