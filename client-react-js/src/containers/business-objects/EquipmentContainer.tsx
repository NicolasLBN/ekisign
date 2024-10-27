import React, { useEffect, useState } from 'react';
import EquipmentComponent, { EquipmentComponentProps } from '../../components/business-objects/EquipmentComponent';
import { removeUserFromBench } from "../..//services/api";

const BenchContainer: React.FC<EquipmentComponentProps> = ({ equipment }) => {
  const [users, setUsers] = useState(equipment.users);

  useEffect(() => {
    setUsers(equipment.users);
  }, [equipment.users]);


  function removeUser(userId: number) {
    console.log('+++REMOVE USERS+++: ', userId)
    removeUserFromBench(userId)
    setUsers((prevUsers: any[]) => prevUsers.filter((user: { id: number; }) => user.id !== userId));
  }

  function addUser(userId: number) {
    console.log('+++ADD USERS+++: ', userId)
  }

  return (
    <div>
      <EquipmentComponent key={equipment.id} equipment={{
        ...equipment,
        users: users, // Utiliser l'état mis à jour
        removeUser: removeUser,
        addUser: addUser
      }} />

    </div>
  );
};

export default BenchContainer;