import React, { useEffect, useState } from 'react';
import RoomComponent, { RoomComponentProps } from '../../components/business-objects/RoomComponent';
import { getArborescence } from '../../services/api';
import BenchComponent from '../../components/business-objects/BenchComponent';
import ProjectComponent from '../../components/business-objects/ProjectComponent';

const RoomContainer: React.FC<any> = ({ room }) => {
  let [benches, setBenches] = useState<BenchComponent[]>([]);

  useEffect(() => {
    /*const benches = room.projects.flatMap((project: any) =>
      project.users.flatMap((user: any) =>
        user.benches.map((bench: any) => ({
          id: bench.id,
          name: bench.name,
          roomId: bench.roomId,
          createdAt: bench.createdAt,
          updatedAt: bench.updatedAt,
          users: [{ id: user.id, name: user.name }],
          equipments: user.equipments.map((equipment: any) => ({
            id: equipment.id,
            name: equipment.name
          }))
        }))
      )
    )*/
   const benches = room.projects.flatMap((project: any) =>
    project.users.flatMap((user: any) =>
      user.benches.map((bench: any) => ({
        id: bench.id,
        name: bench.name,
        roomId: bench.roomId,
        createdAt: bench.createdAt,
        updatedAt: bench.updatedAt,
        equipments: user.equipments.map((equipment: any) => ({
          id: equipment.id,
          name: equipment.name,
          users: [{ id: user.id, name: user.name }]
        }))
      }))
    )
  )

    console.log('+++BENCHES+++: ', benches)
    setBenches(benches)
  
  }, []);

  return (
    <div className="roomContainer">
      <RoomComponent room={{
        id: room.id,
        name: room.name,
        createdAt: room.createdAt,
        updatedAt: room.updatedAt,
        projects: room.projects,
        benches: benches
      }} />
    </div>
  );
};

export default RoomContainer;
