import React, { useEffect, useState } from 'react';
import ProjectComponent from '../../components/business-objects/ProjectComponent';
import { getAllProjects, getAllRoomsByProjectId } from '../../services/api';
  
  const ProjectContainer: React.FC = () => {

    let [projects, setProjects] = useState<ProjectComponent[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
              let projects = await getAllProjects();

              // Using Promise.all to resolve all the room promises before updating the state
              let updatedProjects = await Promise.all(
                projects.map(async (proj: { rooms: any; id: number; }) => {
                  let rooms = await getAllRoomsByProjectId(proj.id);
                  // Add rooms to project
                  return { ...proj, rooms };
                })
              );
                setProjects(updatedProjects)
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
            rooms: project.rooms
        }} />
      )
      )}
      </div>
    );
  };
  
  export default ProjectContainer;