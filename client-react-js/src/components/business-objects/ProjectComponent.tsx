import React from 'react';
import RoomComponent from './RoomComponent';
import RoomContainer from '../../containers/business-objects/RoomContainer';

import '../../styles/ProjectComponent.css'

type ProjectComponent = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  rooms: RoomComponent[]
};

export interface ProjectComponentProps {
  project: ProjectComponent;
}

const ProjectComponent: React.FC<ProjectComponentProps> = ({ project }) => {

    return (
        <div className="projectContainer" style={{ marginTop: '20px', padding: '10px', border: '1px solid blue' }}>
        <h1>Projet: {project.name}</h1>
        <p>Créé le: {new Date(project.createdAt).toLocaleString()}</p>
        <p>Dernière mise à jour: {new Date(project.updatedAt).toLocaleString()}</p>
        <div>{project.rooms.map(room => (
          <RoomContainer room={{
            id: room.id,
            name: room.name,
            createdAt: room.createdAt,
            updatedAt: room.updatedAt
          }}/>
        ))}</div>
        </div>
    );
};

export default ProjectComponent;