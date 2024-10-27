import React from 'react';

import '../../styles/BenchComponent.css'
import EquipmentContainer from '../../containers/business-objects/EquipmentContainer';

type BenchComponent = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  equipments: any,
};

export interface BenchComponentProps {
  bench: BenchComponent;
}

const BenchComponent: React.FC<BenchComponentProps> = ({ bench }) => {

  return (
    <div className="BenchContainer" style={{ marginTop: '20px', padding: '10px', border: '1px solid blue' }}>
      <h1>Bench: {bench.name}</h1>
      {bench.equipments.map((equipment: {
        users: any;
        updatedAt: string;
        createdAt: string; id: any; name: any;
      }) => (
        <EquipmentContainer key={bench.id} equipment={{
          id: equipment.id,
          name: equipment.name,
          createdAt: equipment.createdAt,
          updatedAt: equipment.updatedAt,
          users: equipment.users
        }} />
      ))}
    </div>
  );
};

export default BenchComponent;