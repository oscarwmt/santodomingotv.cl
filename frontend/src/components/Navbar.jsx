// src/components/NavBar.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <img src="/logo-sdtv.png" alt="SantoDomingoTV" width="100" />
          <span>SantoDomingoTV</span>
        </div>

        {/* Menú principal */}
        <ul className="navbar-menu">
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/noticias">Noticias</Link></li>
          <li><Link to="/contacto">Contacto</Link></li>
          <li><Link to="/admin/noticias">📝 Área de Administración</Link></li>
        </ul>

        {/* Información adicional (opcional) */}
        <div className="navbar-contact">
          <p>📞 +1 809-XXX-XXXX</p>
          <div className="social-icons">
            <a href="#"><img src="/icon-facebook.png" alt="Facebook" width="20" /></a>
            <a href="#"><img src="/icon-twitter.png" alt="Twitter" width="20" /></a>
            <a href="#"><img src="/icon-instagram.png" alt="Instagram" width="20" /></a>
          </div>
        </div>
      </div>
    </nav>
  );
}