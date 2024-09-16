-- Insérer des données dans la table 'Rooms'
INSERT INTO "Rooms" (id, name, "createdAt", "updatedAt") VALUES 
(1, 'Salle A', NOW(), NOW()),
(2, 'Salle B', NOW(), NOW());

-- Insérer des données dans la table 'Benches'
INSERT INTO "Benches" (id, name, "roomId", "createdAt", "updatedAt") VALUES 
(1, 'Banc 1', 1, NOW(), NOW()),
(2, 'Banc 2', 1, NOW(), NOW()),
(3, 'Banc 3', 2, NOW(), NOW());

-- Insérer des données dans la table 'Equipments'
INSERT INTO "Equipment" (id, name, "createdAt", "updatedAt") VALUES 
(1, 'Équipement 1', NOW(), NOW()),
(2, 'Équipement 2', NOW(), NOW()),
(3, 'Équipement 3', NOW(), NOW());

-- Insérer des données dans la table 'Users'
INSERT INTO "Users" (id, name, "createdAt", "updatedAt") VALUES 
(1, 'Alice', NOW(), NOW()),
(2, 'Bob', NOW(), NOW()),
(3, 'Charlie', NOW(), NOW());

-- Insérer des données dans la table 'Projects'
INSERT INTO "Projects" (id, name, "createdAt", "updatedAt") VALUES 
(1, 'Projet Alpha', NOW(), NOW()),
(2, 'Projet Beta', NOW(), NOW());

-- Insérer des données dans la table de liaison 'RoomProjects' (relation Room <-> Project)
INSERT INTO "RoomProjects" ("roomId", "projectId") VALUES 
(1, 1),
(2, 2);

-- Insérer des données dans la table de liaison 'BenchEquipments' (relation Bench <-> Equipment)
INSERT INTO "BenchEquipments" ("benchId", "equipmentId") VALUES 
(1, 1),
(1, 2),
(2, 3);

-- Insérer des données dans la table de liaison 'EquipmentUsers' (relation Equipment <-> User)
INSERT INTO "EquipmentUsers" ("equipmentId", "userId") VALUES 
(1, 1),
(2, 2),
(3, 3);

-- Insérer des données dans la table de liaison 'ProjectUsers' (relation Project <-> User)
INSERT INTO "ProjectUsers" ("projectId", "userId") VALUES 
(1, 1),
(1, 2),
(2, 3);

-- Insérer des données dans la table de liaison 'UserBenches' (relation User <-> Bench)
INSERT INTO "UserBenches" ("userId", "benchId") VALUES 
(1, 1),
(2, 2),
(3, 3);
