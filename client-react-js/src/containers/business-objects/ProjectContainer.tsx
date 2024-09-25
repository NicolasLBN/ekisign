import React, { useEffect, useState } from 'react';
import ProjectComponent from '../../components/business-objects/ProjectComponent';
import { getAllProjects } from '../../services/api';
  
  const ProjectContainer: React.FC = () => {

    const [projects, setProjects] = useState<ProjectComponent[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllProjects()
                setProjects(response)
            } catch (error) {
                console.error('Error fetching benches:', error);
            }
        };

        fetchData();
    }, []);
    
    return (
      <div>
        {projects.map((project) => (
        <ProjectComponent key={project.id} project={{
            id: project.id,
            name: project.name,
            createdAt: project.createdAt,
            updatedAt: project.updatedAt,
            rooms: []
        }} />
      )
      )}
      </div>
    );
  };
  
  export default ProjectContainer;