import React, { useEffect, useState } from 'react'; 
import RoomComponent from '../../components/business-objects/RoomComponent';
import BenchComponent from '../../components/business-objects/BenchComponent';

const RoomContainer: React.FC<any> = ({ room }) => {
  let [benches, setBenches] = useState<BenchComponent[]>([]);

  useEffect(() => {
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
            users: [{ id: user.id, name: user.name }],
          })),
        }))
      )
    );

    // Simplified merging of benches with the same ID
    const mergedBenches = benches.reduce((acc: any, currentBench: any) => {
      const existingBench = acc.find((bench: any) => bench.id === currentBench.id);
      if (existingBench) {
        // Merge equipment users for existing bench
        currentBench.equipments.forEach((currentEquipment: any) => {
          const existingEquipment = existingBench.equipments.find(
            (eq: any) => eq.id === currentEquipment.id
          );

          if (existingEquipment) {
            // Add only new users to the existing equipment
            existingEquipment.users = [
              ...existingEquipment.users,
              ...currentEquipment.users.filter(
                (user: any) => !existingEquipment.users.some((u: any) => u.id === user.id)
              ),
            ];
          } else {
            // Add the new equipment if it doesn't exist
            existingBench.equipments.push(currentEquipment);
          }
        });
      } else {
        // Add the bench if it doesn't exist in the accumulator
        acc.push(currentBench);
      }
      return acc;
    }, []);

    setBenches(mergedBenches);
  }, []);

  return (
    <div className="roomContainer">
      <RoomComponent
        room={{
          id: room.id,
          name: room.name,
          createdAt: room.createdAt,
          updatedAt: room.updatedAt,
          projects: room.projects,
          benches: benches,
        }}
      />
    </div>
  );
};

export default RoomContainer;
