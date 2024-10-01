import React, { useState } from 'react';
import ProjectContainer from '../../containers/business-objects/ProjectContainer';

type UserComponent = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  benches: any
  equipments: any
};

export interface UserComponentProps {
    user: UserComponent;
  }
  
  const RoomComponent: React.FC<UserComponentProps> = ({ user }) => {

    return (
      <div className='roomContainer' style={{ marginTop: '20px', padding: '10px', border: '1px solid red' }}>
        {user.name}
      </div>
    );
  };
  
  export default RoomComponent;