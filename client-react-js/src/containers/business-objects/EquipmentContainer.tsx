import React, { useEffect, useState } from 'react';
import BenchComponent, { BenchComponentProps } from '../../components/business-objects/BenchComponent';
import EquipmentComponent, { EquipmentComponentProps } from '../../components/business-objects/EquipmentComponent';
  
  const BenchContainer: React.FC<EquipmentComponentProps> = ({equipment}) => {
    
    return (
      <div>
        <EquipmentComponent key={equipment.id} equipment={{
            id: equipment.id,
            name: equipment.name,
            createdAt: equipment.createdAt,
            updatedAt: equipment.updatedAt,
            users: equipment.users,
        }} />
      
      </div>
    );
  };
  
  export default BenchContainer;