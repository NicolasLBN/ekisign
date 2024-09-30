import React, { useState } from 'react';
import Project from './ProjectComponent';
import '../../styles/RoomComponent.css'

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
      <div className='roomContainer' style={{ marginTop: '20px', padding: '10px', border: '1px solid red' }}>
        <h2>{room.name}</h2>
        <p>Créée le: {new Date(room.createdAt).toLocaleString()}</p>
        <p>Dernière mise à jour: {new Date(room.updatedAt).toLocaleString()}</p>
      </div>
    );
  };
  
  export default RoomComponent;