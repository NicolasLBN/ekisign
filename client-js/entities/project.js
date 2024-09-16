// project.js
class Project extends HTMLElement {
    constructor() {
      super();
      // Crée un shadow root pour encapsuler le style et le markup
      this.attachShadow({ mode: 'open' });
    }
  
    // Méthode appelée lorsque l'élément est ajouté au DOM
    connectedCallback() {
      // Récupérer le nom depuis les attributs
      const name = this.getAttribute('name') || 'Nom du projet';
      
      // Créer le markup HTML pour le composant
      this.shadowRoot.innerHTML = `
        <style>
          .project {
            border: 1px solid #ccc;
            padding: 16px;
            border-radius: 4px;
            background-color: #f9f9f9;
            font-family: Arial, sans-serif;
          }
        </style>
        <div class="project">
          <h2>Projet : ${name}</h2>
        </div>
      `;
    }
  }
  
  // Déclarer le nouveau composant personnalisé
  customElements.define('my-project', Project);