import React from 'react';
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