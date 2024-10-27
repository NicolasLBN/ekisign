import React from 'react';
import UserContainer from '../../containers/business-objects/UserContainer';

type EquipmentComponent = {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    users: any,
    removeUser: (userId: number) => void;
};

export interface EquipmentComponentProps {
    equipment: EquipmentComponent;
}

const EquipmentComponent: React.FC<EquipmentComponentProps> = ({ equipment }) => {

    return (
        <div className='equipmentContainer' style={{ marginTop: '20px', padding: '10px', border: '1px solid red' }}>
            {equipment.name}
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
    );
};

export default EquipmentComponent;