const express = require('express');
const { Sequelize } = require('sequelize');
const app = express();
const port = 3000;

/*const sequelize = new Sequelize('ekisign', 'ekisign', 'ekisign', {
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
  });*/

app.get('/test', (req, res) => {
  res.send('Hello world!');

});



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
