import React, { useEffect, useState } from 'react';
import ProjectComponent, { ProjectComponentProps } from '../../components/business-objects/ProjectComponent';
import { getAllProjects, getAllRoomsByProjectId } from '../../services/api';
  
  const ProjectContainer: React.FC<ProjectComponentProps> = ({project}) => {


    return (
      <div>
        <ProjectComponent key={project.id} project={{
            id: project.id,
            name: project.name,
            createdAt: project.createdAt,
            updatedAt: project.updatedAt,
            users: project.users
        }} />
      
      </div>
    );
  };
  
  export default ProjectContainer;