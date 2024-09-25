
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

export { getAllBenches, getAllRooms, getAllProjects }