import React, { useState } from 'react';
import UserContainer from '../../containers/business-objects/UserContainer';
import '../../styles/EquipmentComponent.css';
import addProfile from '../../images/add-profile.jpg';
import ScrollableList from '../utils/ScrollableList';
import { UserComponentProps } from './UserComponent';

type EquipmentComponent = {
    roomId: number;
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    users: any,
    usersInRoom: UserComponentProps[],
    removeUser: (userId: number) => void;
    addUser: (userId: number) => void;
};

export interface EquipmentComponentProps {
    equipment: EquipmentComponent;
}

const EquipmentComponent: React.FC<EquipmentComponentProps> = ({ equipment }) => {
    const [showList, setShowList] = useState(false);

    const handleImageClick = () => {
        setShowList(!showList); // Affiche ou cache la liste au clic sur l'image
        equipment.addUser(equipment.roomId); // Appel de la fonction addUser
    };

    return (
        <div className='equipment'>
            <div className='equipment-row'>
                <div className='equipment-name'>{equipment.name}</div>
                <div className="equipment-actions">
                    <img 
                        onClick={handleImageClick} 
                        src={addProfile} 
                        height={30} 
                        width={30} 
                        alt="Add user"
                    />
                    {showList && (
                        <ScrollableList elements={equipment.usersInRoom.map(user => user.name)} />
                    )}
                </div>
            </div>
            <div className='equipment-row'>
                {equipment.users.map((user: {
                    createdAt: string;
                    updatedAt: string; 
                    id: any; 
                    name: any;
                }) => (
                    <UserContainer key={user.id} user={{
                        id: user.id,
                        name: user.name,
                        createdAt: user.createdAt,
                        updatedAt: user.updatedAt,
                        removeUser: equipment.removeUser
                    }} />
                ))}
            </div>
        </div>
    );
};

export default EquipmentComponent;
