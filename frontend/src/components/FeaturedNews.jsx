import React from "react";

const mockFeatured = {
  title: "Última noticia importante en Santo Domingo",
  subtitle: "Resumen breve de la noticia más reciente con detalles clave",
  image: "https://via.placeholder.com/800x400",
};

export default function FeaturedNews() {
  return (
    <section className="w-full max-w-5xl mb-8">
      <h2 className="text-2xl font-bold mb-4 text-black">Noticia destacada</h2>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <img
          src={mockFeatured.image}
          alt="Noticia destacada"
          className="w-full h-64 object-cover"
        />
        <div className="p-4">
          <h3 className="text-xl font-bold text-black">{mockFeatured.title}</h3>
          <p className="text-gray-700 mt-2">{mockFeatured.subtitle}</p>
        </div>
      </div>
    </section>
  );
}
