import React from 'react';

import '../../styles/ProjectComponent.css'
import UserContainer from '../../containers/business-objects/UserContainer';

type ProjectComponent = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  users: any[]
};

export interface ProjectComponentProps {
  project: ProjectComponent;
}

const ProjectComponent: React.FC<ProjectComponentProps> = ({ project }) => {

    return (
        <div className="projectContainer" style={{ marginTop: '20px', padding: '10px', border: '1px solid blue' }}>
        <h1>Projet: {project.name}</h1>
        {project.users.map(user => (
        <UserContainer key={user.id} user={{
          id: user.id,
          name: user.name,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          removeUser: () => {}
        }}/>
        
        ))}    
        </div>
    );
};

export default ProjectComponent;