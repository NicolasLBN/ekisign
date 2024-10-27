import React from 'react';
import UserContainer from '../../containers/business-objects/UserContainer';
import '../../styles/EquipmentComponent.css'
import addProfile from '../../images/add-profile.jpg'

type EquipmentComponent = {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    users: any,
    removeUser: (userId: number) => void;
    addUser: (userId: number) => void;
};

export interface EquipmentComponentProps {
    equipment: EquipmentComponent;
}

const EquipmentComponent: React.FC<EquipmentComponentProps> = ({ equipment }) => {

    return (
        <div className='equipment'>
            <div className='equipment-row' >
                <div className='equipment-name'>
                    {equipment.name}
                </div>
                <img onClick={() => equipment.addUser(2)} src={addProfile} height={30} width={30}/>
            </div>
            <div className='equipment-row'>
                {equipment.users.map((user: {
                    createdAt: string;
                    updatedAt: string; id: any; name: any;
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