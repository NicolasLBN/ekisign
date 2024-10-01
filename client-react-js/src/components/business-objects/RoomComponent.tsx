import React, { useState } from 'react';
import Project from './ProjectComponent';
import '../../styles/RoomComponent.css'
import ProjectContainer from '../../containers/business-objects/ProjectContainer';

type RoomComponent = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  projects: any
};

export interface RoomComponentProps {
  room: RoomComponent;
}

const RoomComponent: React.FC<RoomComponentProps> = ({ room }) => {

  return (
    <div className='roomContainer' style={{ marginTop: '20px', padding: '10px', border: '1px solid red' }}>
      <h2>{room.name}</h2>
      {room.projects.map((proj: {
        users: any[];
        updatedAt: string;
        createdAt: string;
        name: string; id: number
      }) => (
        <ProjectContainer key={proj.id} project={{
          id: proj.id,
          name: proj.name,
          createdAt: proj.createdAt,
          updatedAt: proj.updatedAt,
          users: proj.users
        }} />
      ))}
    </div>
  );
};

export default RoomComponent;