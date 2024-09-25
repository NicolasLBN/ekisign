import React, { useState } from 'react';
import RoomComponent from './RoomComponent';

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
        <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc' }}>
        <h2>Projet: {project.name}</h2>
        <p>Créé le: {new Date(project.createdAt).toLocaleString()}</p>
        <p>Dernière mise à jour: {new Date(project.updatedAt).toLocaleString()}</p>
        </div>
    );
};

export default ProjectComponent;