import React, { useEffect, useState } from 'react';
import EquipmentComponent, { EquipmentComponentProps } from '../../components/business-objects/EquipmentComponent';
import { removeUserFromBench, getAllUsersByRoomId } from "../../services/api";
import { UserComponentProps } from '../../components/business-objects/UserComponent';

const EquipmentContainer: React.FC<EquipmentComponentProps> = ({ equipment }) => {
  const [users, setUsers] = useState(equipment.users);
  const [usersInRoom, setUsersInRoom] = useState<UserComponentProps[]>([]); // Initialise un tableau vide

  useEffect(() => {
    // Fonction asynchrone pour récupérer les utilisateurs dans la salle
    const fetchUsersInRoom = async () => {
      try {
        const roomUsers = await getAllUsersByRoomId(equipment.roomId);
        setUsersInRoom(roomUsers);
      } catch (error) {
        console.error('Erreur lors du chargement des utilisateurs dans la salle:', error);
      }
    };

    fetchUsersInRoom();
  }, [equipment.roomId]); // Ce useEffect sera déclenché lorsque roomId change

  useEffect(() => {
    setUsers(equipment.users);
  }, [equipment.users]);

  function removeUser(userId: number) {
    removeUserFromBench(userId);
    setUsers((prevUsers: any[]) => prevUsers.filter((user: { id: number }) => user.id !== userId));
  }

  async function addUser(roomId: number) {

  }

  return (
    <div>
      <EquipmentComponent
        key={equipment.id}
        equipment={{
          ...equipment,
          users: users, // Utiliser l'état mis à jour
          usersInRoom: usersInRoom,
          removeUser: removeUser,
          addUser: addUser
        }}
      />
    </div>
  );
};

export default EquipmentContainer;
