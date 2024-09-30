const express = require('express');
const cors = require('cors');

const { Sequelize, DataTypes } = require('sequelize');
const bodyParser = require('body-parser');
const object = ["rooms", "roomsProjects", "users", "usersBenches", "benches", "projects", "projectsUsers", "equipments", "equipmentsUsers", "benchesEquipments"];


const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


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
const EquipmentUsers = require('./models/equipment_users')(sequelize, DataTypes);
const ProjectUsers = require('./models/project_user')(sequelize, DataTypes);
const RoomProject = require('./models/room_project')(sequelize, DataTypes);
const BenchEquipment = require('./models/bench_equipment')(sequelize, DataTypes);
const UserBench = require('./models/user_bench')(sequelize, DataTypes);


const models = {
  rooms: Room,
  users: User,
  benches: Bench,
  projects: Project,
  equipments: Equipment,
  equipmentsUsers: EquipmentUsers,
  projectsUsers: ProjectUsers,
  roomsProject: RoomProject,
  benchesEquipment: BenchEquipment,
  usersBenches: UserBench,
};


// Synchroniser tous les modèles
sequelize.sync()

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
  app.get(`${routeBase}/:id`, async (req, res) => {
    try {
      const record  = await Model.findByPk(req.params.id);
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

    // Update a record by ID
    app.put(`${routeBase}/:id`, async (req, res) => {
      try {
        const [updated] = await Model.update(req.body, {
          where: { id: req.params.id }
        });
        if (updated) {
          const updatedRecord = await Model.findByPk(req.params.id);
          res.json(updatedRecord);
        } else {
          res.status(404).json({ error: `${modelName} not found` });
        }
      } catch (err) {
        res.status(500).json({ error: `Failed to update ${modelName}` });
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

async function deleteAllRecords() {
  try {
    // Delete all reocrds
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

  // Get roomsByProjectId
  app.get(`/roomsByProjectId/:id`, async (req, res) => {
    try {
      const projectId = req.params.id;

    // Get all rooms associate to projectId
    const [rooms] = await sequelize.query(
      
      `SELECT r.*
      FROM public."Rooms" r
      JOIN public."RoomProjects" rp ON r.id = rp."roomId"
      JOIN public."Projects" p ON p.id = rp."projectId"
      WHERE p.id = :projectId`,

      {
        // Replace projectId
        replacements:  {projectId} ,
      }
    );

    if (rooms.length) {
      // Return all associate rooms to the projects
      res.json(rooms);
    } else {
      res.status(404).json({ error: `No rooms found for this project` });
    }
  } catch (err) {
      res.status(500).json({ error: `Failed to retrieve RoomProject` });
    }
  });

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
