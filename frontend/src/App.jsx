import React from "react";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import NewsList from "./components/NewsList";
import Sidebarleft from "./components/Sidebarleft";
import SidebarRight from "./components/SidebarRight";

export default function App() {
  return (
    <div className="container">
      {/* NAVBAR */}
      <header className="navbar">
        <Navbar />
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main className="main">
        {/* SIDEBAR IZQUIERDO */}
        <aside className="sidebar-left">
          <Sidebarleft />
        </aside>

        {/* SECCIÓN DE NOTICIAS */}
        <section className="content">
          <NewsList />
        </section>

        {/* SIDEBAR DERECHO */}
        <aside className="sidebar-right">
          <SidebarRight />
        </aside>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <Footer />
      </footer>
    </div>
  );
}