import Navbar from "../components/Navbar"
import React, { useEffect } from 'react';
import {getAllBenches} from "../services/api"

export default function Designer() {
useEffect(() => {
    const fetchData = async () => {
        try {
            const benches = await getAllBenches()
            console.log('+++BENCHES+++: ', benches)
        } catch (error) {
            console.error('Error fetching benches:', error);
        }
    };

    fetchData();
}, []);

  return (
    <div>
        <Navbar/>
        <div>DESIGNER</div>

    </div>
  )
}