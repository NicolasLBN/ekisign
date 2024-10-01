import React from 'react';

import '../../styles/BenchComponent.css'

type BenchComponent = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export interface BenchComponentProps {
  bench: BenchComponent;
}

const BenchComponent: React.FC<BenchComponentProps> = ({ bench }) => {

    return (
        <div className="projectContainer" style={{ marginTop: '20px', padding: '10px', border: '1px solid blue' }}>
        <h1>Projet: {bench.name}</h1>
        <p>Créé le: {new Date(bench.createdAt).toLocaleString()}</p>
        <p>Dernière mise à jour: {new Date(bench.updatedAt).toLocaleString()}</p>
        
        </div>
    );
};

export default BenchComponent;