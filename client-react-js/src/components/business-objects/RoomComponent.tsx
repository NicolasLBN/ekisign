import React, { useState } from 'react';
import Project from './ProjectComponent';

type RoomComponent = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export interface RoomComponentProps {
    room: RoomComponent;
  }
  
  const RoomComponent: React.FC<RoomComponentProps> = ({ room }) => {

    const [projects, setProjects] = useState<Project[]>([]);

    return (
      <div>
        <h1>{room.name}</h1>
        <p>Créée le: {new Date(room.createdAt).toLocaleString()}</p>
        <p>Dernière mise à jour: {new Date(room.updatedAt).toLocaleString()}</p>
      </div>
    );
  };
  
  export default RoomComponent;