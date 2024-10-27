import React from 'react';
import '../../styles/UserComponent.css'
import trash from '../../images/delete.png'

type UserComponent = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  removeUser: (userId: number) => void;
};

export interface UserComponentProps {
    user: UserComponent;
  }
  
  const RoomComponent: React.FC<UserComponentProps> = ({ user }) => {

    return (
      <div className='user'>
        <div>{user.name}</div>
        <img onClick={() => user.removeUser(user.id)} src={trash} height={20} width={20}/>
      </div>
    );
  };
  
  export default RoomComponent;