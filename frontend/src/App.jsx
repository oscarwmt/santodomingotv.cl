import React from "react";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import NewsList from "./components/NewsList";
import Sidebarleft from "./components/Sidebarleft";
import SidebarRight from "./components/SidebarRight";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* NAVBAR */}
      <Navbar />

      {/* CONTENIDO CENTRAL */}
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* SIDEBAR IZQUIERDO */}
          <aside className="md:col-span-1 hidden md:block">
            <Sidebarleft />
          </aside>

          {/* NOTICIAS PRINCIPALES */}
          <section className="md:col-span-2">
            <NewsList />
          </section>

          {/* SIDEBAR DERECHO */}
          <aside className="md:col-span-1 hidden md:block">
            <SidebarRight />
          </aside>
        </div>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
