import React, { useEffect, useState } from 'react';
import ProjectComponent from '../../components/business-objects/ProjectComponent';
import { getAllProjects } from '../../services/api';
import BenchComponent, { BenchComponentProps } from '../../components/business-objects/BenchComponent';
  
  const BenchContainer: React.FC<BenchComponentProps> = ({bench}) => {
    
    return (
      <div>
        <BenchComponent key={bench.id} bench={{
            id: bench.id,
            name: bench.name,
            createdAt: bench.createdAt,
            updatedAt: bench.updatedAt,
            equipments: bench.equipments
        }} />
      
      </div>
    );
  };
  
  export default BenchContainer;