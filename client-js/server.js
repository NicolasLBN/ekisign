const apiURL = 'http://localhost:3000/';


async function onPageLoad() {
console.log('La page est chargée.');
const benches = await getAllBenches()
const equipments = await getAllEquipments()
const users = await getAllUsers()
const projects = await getAllProjects()
const rooms = await getAllRooms()

//Take a list of projects create and insert components in DOM
createProjects(projects)
}

async function getAllBenches(){
    return await fetchApi(apiURL + 'benches')
}

async function getAllRooms(){
    return await fetchApi(apiURL + 'rooms')
}

async function getAllEquipments(){
    return await fetchApi(apiURL + 'equipments')
}

async function getAllUsers(){
    return await fetchApi(apiURL + 'users')
}

async function getAllProjects(){
    return await fetchApi(apiURL + 'projects')
}

//Take a list of projects create and insert components in DOM
function createProjects(projects) {
    if(! projects.length) return

    projects.forEach(el => {
        const projectElement = document.createElement('my-project');
  
        projectElement.setAttribute('name', el.name);
      
        const container = document.getElementById('project-container');
      
        container.appendChild(projectElement);
    })
}


async function fetchApi(url){
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


document.addEventListener('DOMContentLoaded', onPageLoad);
