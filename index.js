const express = require('express');
const { Sequelize } = require('sequelize');
const app = express();
const port = 3000;

const sequelize = new Sequelize('nom_de_la_base_de_donnees', 'votre_utilisateur', 'votre_mot_de_passe', {
  host: 'localhost',
  dialect: 'postgres'
});

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

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
