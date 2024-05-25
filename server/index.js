const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const app = express();
const port = 3000;

// Set up Sequelize
const sequelize = new Sequelize('ekisign', 'postgres', 'root', {
  host: 'localhost',
  dialect: 'postgres'
});

// Import models
const Project = require('./models/project')(sequelize, DataTypes);
const Room = require('./models/room')(sequelize, DataTypes);
const Bench = require('./models/bench')(sequelize, DataTypes);
const User = require('./models/user')(sequelize, DataTypes);
const Equipment = require('./models/equipment')(sequelize, DataTypes);

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    return sequelize.sync();  // Synchronize all models
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Synchroniser tous les modèles
sequelize.sync()
  .then(async () => {
    //console.log('Database & tables created!');
    populateDb()
  });

// Route pour récupérer tous les users
app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve users' });
  }
});

// Route pour récupérer tous les bancs
app.get('/benches', async (req, res) => {
  try {
    const benches = await Bench.findAll();
    res.json(benches);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve benches' });
  }
});

// Route pour récupérer tous les projets
app.get('/projects', async (req, res) => {
  try {
    const projects = await Project.findAll();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve projects' });
  }
});

// Route pour récupérer toutes les salles
app.get('/rooms', async (req, res) => {
  try {
    const rooms = await Room.findAll();
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve rooms' });
  }
});

// Route pour récupérer toutes les equipements
app.get('/equipements', async (req, res) => {
  try {
    const device = await Room.findAll();
    res.json(device);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve rooms' });
  }
});


async function populateDb() {
  let room;
  const existingRoom = await Room.findOne({ where: { name: 'Room 1' } });
  if (!existingRoom) {
    const room = await Room.create({ name: 'Room 1' });
  }
  if (room) {
    const existingBench = await Bench.findOne({ where: { name: 'Bench 1', RoomId: room.id } });
    if (!existingBench) {
      await Bench.create({ name: 'Bench 1', RoomId: room.id });
    }
  const existingProject = await Project.findOne({ where: { name: 'Project 1' } });
  if (!existingProject) {
    await Project.create({ name: 'Project 1' });
  }
  const existingUser = await User.findOne({ where: { email: 'john.doe@example.com' } });
  if (!existingUser) {
    await User.create({ firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' });
  }
  const existingEquipment = await Equipment.findOne({ where: { name: 'Equipment 1' } });
  if (!existingEquipment) {
    await Equipment.create({ name: 'Equipment 1' });
  }
}
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});