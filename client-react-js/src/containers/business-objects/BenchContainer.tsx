import React, { useEffect, useState } from 'react';
import ProjectComponent from '../../components/business-objects/ProjectComponent';
import { getAllProjects } from '../../services/api';
import BenchComponent from '../../components/business-objects/BenchComponent';
  
  const ProjectContainer: React.FC = () => {

    let [benches, setBenches] = useState<ProjectComponent[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
              let benches = await getAllProjects();

              // Using Promise.all to resolve all the room promises before updating the state
              setBenches(benches)
            } catch (error) {
                console.error('Error fetching benches:', error);
            }
        };

        fetchData();
    }, []);
    
    return (
      <div>
        {benches.map((bench) => (
        <BenchComponent key={bench.id} bench={{
            id: bench.id,
            name: bench.name,
            createdAt: bench.createdAt,
            updatedAt: bench.updatedAt,
        }} />
      )
      )}
      </div>
    );
  };
  
  export default ProjectContainer;