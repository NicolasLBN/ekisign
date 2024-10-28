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
      const record = await Model.findByPk(req.params.id);
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
        replacements: { projectId },
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

app.get(`/usersByRoomId/:id`, async (req, res) => {
  try {
    const roomId = req.params.id;
    let users = await getUsersByRoomId(roomId)
    res.json(users);

  } catch (err) {
    res.status(500).json({ error: `Failed to retrieve users` });
  }
});



/**
 * GET /arborescence - Retrieves a tree structure of rooms, projects, users, benches, and equipment.
 * 
 * This endpoint fetches all rooms from the database and for each room, it retrieves the associated projects. 
 * Then, for each project, it fetches the associated users, and for each user, it retrieves their benches and equipment.
 * The response is a nested structure where each room contains its associated projects, 
 * each project contains its users, and each user contains their benches and equipment.
 *
 * @async
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} Responds with JSON containing the tree structure of rooms, projects, users, benches, and equipment.
 * 
 * @throws {Object} 500 - If any errors occur during the database retrieval or processing of data, responds with a 500 status code and an error message.
 * 
 * @example
 * // Example response structure:
 * [
 *   {
 *     "id": 1,
 *     "name": "Room A",
 *     "updatedProjects": [
 *       {
 *         "id": 101,
 *         "name": "Project 1",
 *         "updatedUsers": [
 *           {
 *             "id": 1001,
 *             "name": "User 1",
 *             "benches": [ array of benches ],
 *             "equipments": [ array of equipments  ]
 *           }
 *         ]
 *       }
 *     ]
 *   }
 * ]
 */    app.get(`/arborescence`, async (req, res) => {
  try {
    let rooms = await Room.findAll()

    let updatedRooms = await Promise.all(
      rooms.map(async (room) => {
        let projects = await getProjectsByRoomId(room.id);
        projects = await Promise.all(
          projects.map(async (project) => {
            let users = await getUsersByProjectId(project.id)
            users = await Promise.all(
              users.map(async (user) => {
                let benches = await getBenchesByUserId(user.id)
                let equipments = await getEquipmentByUserId(user.id)
                return { ...user, benches, equipments }
              })
            )
            return { ...project, users };
          })
        )
        return { ...room.dataValues, projects };
      })
    )

    res.json(updatedRooms);

  } catch (err) {
    res.status(500).json({ error: `Failed to retrieve arbo` });
  }
});

async function getProjectsByRoomId(roomId) {
  const [projects] = await sequelize.query(

    `SELECT p.*
          FROM public."Projects" p
          JOIN public."RoomProjects" rp ON p.id = rp."projectId"
          JOIN public."Rooms" r ON r.id = rp."roomId"
          WHERE r.id = :roomId;`,

    {
      // Replace projectId
      replacements: { roomId },
    }
  );
  return projects
}


async function getUsersByProjectId(projectId) {
  const [users] = await sequelize.query(

    `SELECT u.*
          FROM public."Users" u
          JOIN public."ProjectUsers" pu ON u.id = pu."userId"
          JOIN public."Projects" p ON p.id = pu."projectId"
          WHERE p.id = :projectId;
          `,
    {
      // Replace projectId
      replacements: { projectId },
    }
  );
  return users
}


async function getBenchesByUserId(userId) {
  const [benches] = await sequelize.query(

    `SELECT b.*
          FROM public."Benches" b
          JOIN public."UserBenches" ub ON b.id = ub."benchId"
          JOIN public."Users" u ON u.id = ub."userId"
          WHERE u.id = :userId;

          `,
    {
      // Replace projectId
      replacements: { userId },
    }
  );
  return benches
}


async function getEquipmentByUserId(userId) {
  const [benches] = await sequelize.query(

    `SELECT e.*
          FROM public."Equipment" e
          JOIN public."EquipmentUsers" eu ON e.id = eu."equipmentId"
          JOIN public."Users" u ON u.id = eu."userId"
          WHERE u.id = :userId;
          `,
    {
      // Replace projectId
      replacements: { userId },
    }
  );
  return benches
}

async function getUsersByRoomId(roomId) {
  const [users] = await sequelize.query(

    `SELECT DISTINCT u.*
      FROM "Users" u
      JOIN "ProjectUsers" pu ON u.id = pu."userId"
      JOIN "Projects" p ON pu."projectId" = p.id
      JOIN "RoomProjects" rp ON p."id" = rp."projectId"
      JOIN "Rooms" r ON rp."roomId" = r.id
      WHERE r.id = :roomId;
          `,
    {
      // Replace projectId
      replacements: { roomId },
    }
  );
  return users
}

app.delete(`/benches/removeUser/:userId`, async (req, res) => {
  const userId = req.params.userId;

  try {
    const deleted = await UserBench.destroy({
      where: { userId: userId }
    });

    if (deleted) {
      res.status(200).json({ message: `User with ID ${userId} removed from benches successfully` });
    } else {
      res.status(404).json({ error: `User with ID ${userId} not found in benches` });
    }
  } catch (err) {
    console.error('Error removing user from benches:', err);
    res.status(500).json({ error: `Failed to remove user from benches` });
  }
});

/*
SELECT DISTINCT u.*
FROM "Users" u
JOIN "ProjectUsers" pu ON u.id = pu."userId"
JOIN "Projects" p ON pu."projectId" = p.id
JOIN "RoomProjects" rp ON p."id" = rp."projectId"
JOIN "Rooms" r ON rp."roomId" = r.id
WHERE r.id = 1
*/
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
