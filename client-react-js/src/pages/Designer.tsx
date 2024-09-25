import Navbar from "../components/Navbar"
import React, { useEffect, useState } from 'react';
import {getAllBenches} from "../services/api"
import {getAllRooms} from "../services/api"
import ProjectComponent from "../components/business-objects/ProjectComponent";
import ProjectContainer from "../containers/business-objects/ProjectContainer";

export default function Designer() {

    const [projects, setProjects] = useState<ProjectComponent[]>([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllRooms()
                setProjects(response)
            } catch (error) {
                console.error('Error fetching benches:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <Navbar/>
            <div>
                <ProjectContainer/>
            </div>
        </div>
    )
}