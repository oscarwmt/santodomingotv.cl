// src/components/Footer.jsx
import React from "react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <img src="/logo-sdtv.png" alt="Logo" width="70" />
          <p>SantoDomingoTV - Noticias de última hora</p>
        </div>

        <div className="footer-section">
          <h4>Menú</h4>
          <ul>
            <li><a href="/">Inicio</a></li>
            <li><a href="/noticias">Noticias</a></li>
            <li><a href="/contacto">Contacto</a></li>
            <li><a href="/admin">Área de administración</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contacto</h4>
          <p>📞 +1 809-XXX-XXXX</p>
          <div className="social-icons">
            <a href="#"><img src="/icon-facebook.png" alt="Facebook" /></a>
            <a href="#"><img src="/icon-twitter.png" alt="Twitter" /></a>
            <a href="#"><img src="/icon-instagram.png" alt="Instagram" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}