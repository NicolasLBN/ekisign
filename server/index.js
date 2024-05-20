const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const app = express();
const port = 3000;

const sequelize = new Sequelize('ekisign', 'postgres', 'root', {
  host: 'localhost',
  dialect: 'postgres'
});

const Project = require('./models/project')(sequelize, DataTypes);
const Room = require('./models/room')(sequelize, DataTypes);
const Bench = require('./models/bench')(sequelize, DataTypes);
const User = require('./models/user')(sequelize, DataTypes);
const Equipment = require('./models/equipment')(sequelize, DataTypes);

const room = Room.create({ name: 'Room 1' });
const project = Project.create({ name: 'Project 1' });
const bench = Bench.create({ name: 'Bench 1', RoomId: room.id });
const user = User.create({ firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' });
const equipment = Equipment.create({ name: 'Equipment 1' });


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

app.get('/users', async (req, res) => {
  //res.send('Hello world!');
  const users = await User.findAll();
  res.json(users)
});



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});