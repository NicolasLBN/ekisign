import React, { useState } from 'react';
import '../../styles/RoomComponent.css'
import BenchContainer from '../../containers/business-objects/BenchContainer';

type RoomComponent = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  projects: any;
  benches: any
};

export interface RoomComponentProps {
  room: RoomComponent;
}

const RoomComponent: React.FC<RoomComponentProps> = ({ room }) => {

  return (
    <div className='roomContainer' style={{ marginTop: '20px', padding: '10px', border: '1px solid red' }}>
      <h2>{room.name}</h2>
      {room.benches.map((bench: any) => (
        <BenchContainer key={bench.id} bench={{
          id: bench.id,
          name: bench.name,
          createdAt: bench.createdAt,
          updatedAt: bench.updatedAt,
          equipments: bench.equipments
        }}
        />
      ))}
    </div>
  );
};

export default RoomComponent;