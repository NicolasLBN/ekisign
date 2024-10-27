import { useEffect, useState } from "react";
import Navbar from "../components/Navbar"
import { getArborescence } from "../services/api";
import RoomContainer from "../containers/business-objects/RoomContainer";
import RoomComponent from "../components/business-objects/RoomComponent";

export default function Designer() {

    let [arborescence, setArborescence] = useState<RoomComponent[]>([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await getArborescence()
                setArborescence(response)
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
                {arborescence.map(room => (
                    <RoomContainer key={room.id} room={{
                        id: room.id,
                        name: room.name,
                        createdAt: room.createdAt,
                        updatedAt: room.updatedAt,
                        projects: room.projects,
                    }}/>
                ))}
            </div>
        </div>
    )
}