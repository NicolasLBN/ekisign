const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const bodyParser = require('body-parser');
const object = ["rooms", "users", "benches", "projects", "equipments"];


const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

const models = {
  rooms: Room,
  users: User,
  benches: Bench,
  projects: Project,
  equipment: Equipment
};

// Synchroniser tous les modèles
sequelize.sync()
  .then(async () => {
    console.log('Database & tables created!');
    populateDb();
  });

// Function to create generic CRUD routes
const createCrudRoutes = (modelName, Model) => {
const routeBase = `/${modelName.toLowerCase()}`;

  // Get all records
  app.get(`${routeBase}`, async (req, res) => {
    try {
      const records = await Model.findAll();
      res.json(records);
    } catch (err) {
      res.status(500).json({ error: `Failed to retrieve ${modelName}` });
    }
  });

  // Get a single record by ID
  app.get(`${routeBase}/:name`, async (req, res) => {
    try {
      const record = await Model.findOne({ where: { name: req.params.name } });
      if (record) {
        res.json(record);
      } else {
        res.status(404).json({ error: `${modelName} not found` });
      }
    } catch (err) {
      res.status(500).json({ error: `Failed to retrieve ${modelName}` });
    }
  });

  // Create a new record
  app.post(`${routeBase}`, async (req, res) => {
    try {
      const newRecord = await Model.create(req.body);
      res.status(201).json(newRecord);
    } catch (err) {
      res.status(500).json({ error: `Failed to create ${modelName}` });
    }
  });

  // Delete a record by ID
  app.delete(`${routeBase}/:id`, async (req, res) => {
    try {
      const deleted = await Model.destroy({
        where: { id: req.params.id }
      });
      if (deleted) {
        res.status(200).json({ message: `${modelName} deleted successfully` });
      } else {
        res.status(404).json({ error: `${modelName} not found` });
      }
    } catch (err) {
      res.status(500).json({ error: `Failed to delete ${modelName}` });
    }
  });

};
async function populateDb() {
  let room;
  const existingRoom = await Room.findOne({ where: { name: 'Room 1' } });
  if (!existingRoom) {
    const room = await Room.create({ name: 'Room 1' });
  }
  if (room) {
    const existingBench = await Bench.findOne({ where: { name: 'Bench 1'} });
    if (!existingBench) {
      await Bench.create({ name: 'Bench 1', RoomId: room.id });
    }
  }
  else{
      const existingBench = await Bench.findOne({ where: { name: 'Bench 1'} });
      if (!existingBench) {
        await Bench.create({ name: 'Bench 1', RoomId: existingRoom.id });
      }
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

async function deleteAllRecords() {
  try {
    // Supprimer tous les enregistrements de chaque modèle
    await Project.destroy({ where: {} });
    await Room.destroy({ where: {} });
    await Bench.destroy({ where: {} });
    await User.destroy({ where: {} });
    await Equipment.destroy({ where: {} });

    console.log('All records deleted successfully.');
  } catch (error) {
    console.error('Error deleting records:', error);
  }
}

// Generate CRUD routes for each model
object.forEach(modelName => {
  createCrudRoutes(modelName, models[modelName]);
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
