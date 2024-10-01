
const apiUrl = "http://localhost:3000/"

async function fetchApi(url: string){
    try {
        const response = await fetch(url);
    
        if (!response.ok) {
          throw new Error('Erreur de la requête GET : ' + response.status);
        }

        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Erreur:', error);
      };
} 

async function getAllBenches(){
    return await fetchApi(apiUrl + 'benches')
}

async function getAllRooms(){
  return await fetchApi(apiUrl + 'rooms')
}

async function getAllProjects(){
  return await fetchApi(apiUrl + 'projects')
}

async function getAllRoomsByProjectId(projectId: number){
  return await fetchApi(apiUrl + 'roomsByProjectId/' + projectId)
}

async function getAllBenchesByRooms(roomId: number){
  return await fetchApi(apiUrl + 'benchesByRoomId/' + roomId)
}

async function getArborescence(){
  return await fetchApi(apiUrl + 'arborescence/')
}


export { getAllBenches, getAllRooms, getAllProjects, getAllRoomsByProjectId, getAllBenchesByRooms, getArborescence }