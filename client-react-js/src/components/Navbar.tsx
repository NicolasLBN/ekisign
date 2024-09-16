import React from 'react';
import {
    NavLink
  } from "react-router-dom";
import '../styles/Navbar.css'; // Assurez-vous que ce fichier contient le style CSS que vous avez fourni

const linkStyle = {
    textDecoration: "none",
    color: "#050000fa"
  }

const Navbar: React.FC = () => {
  return (
    <header className="header">
      <h2 id="ekisign">Ekisign</h2>
      <nav className="navbar">
        <ul>
          <NavLink 
          style={linkStyle} 
          to="/contact" 
          className={({ isActive }) => (isActive ? "current" : "")}
        >
          <div>Demander un devis</div>
        </NavLink>
        <NavLink 
          style={linkStyle} 
          to="/presentation" 
          className={({ isActive }) => (isActive ? "current" : "")}
        >
          <div>Qui sommes-nous ?</div>
        </NavLink>
        
        <NavLink 
          style={linkStyle} 
          to="/designer" 
          className={({ isActive }) => (isActive ? "current" : "")}
        >
          <div>Designer</div>
        </NavLink>
        </ul>
      </nav>
      <button>Se connecter</button>
    </header>
  );
}

export default Navbar;
