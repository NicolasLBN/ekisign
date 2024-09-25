import React, { useState } from 'react';
import RoomComponent, { RoomComponentProps } from '../../components/business-objects/RoomComponent';
import ProjectComponent from '../../components/business-objects/ProjectComponent';

  const RoomContainer: React.FC<RoomComponentProps> = ({ room }) => {

    const [projects, setProjects] = useState<ProjectComponent[]>([]);

    return (
      <div>
        <RoomComponent room={{
                id: 0,
                name: '',
                createdAt: '',
                updatedAt: '',
            }}/>
      </div>
    );
  };
  
  export default RoomContainer;