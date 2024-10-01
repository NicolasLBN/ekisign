import React, { useState } from 'react';
import RoomComponent, { RoomComponentProps } from '../../components/business-objects/RoomComponent';

  const RoomContainer: React.FC<RoomComponentProps> = ({ room }) => {


    return (
      <div className="roomContainer">
        <RoomComponent room={{
                id: room.id,
                name: room.name,
                createdAt: room.createdAt,
                updatedAt: room.updatedAt,
                projects: room.projects
            }}/>
      </div>
    );
  };
  
  export default RoomContainer;