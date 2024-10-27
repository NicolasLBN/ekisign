import React from 'react';
import UserComponent, { UserComponentProps } from '../../components/business-objects/UserComponent';

  const UserContainer: React.FC<UserComponentProps> = ({ user }) => {

    return (
      <div className="userContainer" >
        <UserComponent user={{
                id: user.id,
                name: user.name,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
                removeUser: user.removeUser
            }}/>
      </div>
    );
  };
  
  export default UserContainer;