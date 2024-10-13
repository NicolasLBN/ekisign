import React from 'react';

type UserComponent = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export interface UserComponentProps {
    user: UserComponent;
  }
  
  const RoomComponent: React.FC<UserComponentProps> = ({ user }) => {

    return (
      <div className='roomContainer' style={{ marginTop: '20px', padding: '10px', border: '1px solid green' }}>
        {user.name}
      </div>
    );
  };
  
  export default RoomComponent;