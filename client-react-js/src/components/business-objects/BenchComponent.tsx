import React from 'react';

import '../../styles/BenchComponent.css'
import EquipmentContainer from '../../containers/business-objects/EquipmentContainer';

type BenchComponent = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  equipments: any,
  roomId: number
};

export interface BenchComponentProps {
  bench: BenchComponent;
}

const BenchComponent: React.FC<BenchComponentProps> = ({ bench }) => {

  return (
    <div className="BenchContainer" style={{ marginTop: '20px', padding: '10px', border: '1px solid blue' }}>
      <h1>Bench: {bench.name}</h1>
      {bench.equipments.map((equipment: {
        roomId: number;
        addUser: (userId: number) => void;
        removeUser: (userId: number) => void;
        users: any;
        updatedAt: string;
        createdAt: string; id: any; name: any;
      }) => (
        <EquipmentContainer key={bench.id} equipment={{
          id: equipment.id,
          name: equipment.name,
          createdAt: equipment.createdAt,
          updatedAt: equipment.updatedAt,
          users: equipment.users,
          usersInRoom: [],
          removeUser: equipment.removeUser,
          addUser: equipment.addUser,
          roomId: bench.roomId
        }} />
      ))}
    </div>
  );
};

export default BenchComponent;