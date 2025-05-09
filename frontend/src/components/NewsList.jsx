import React, { useEffect, useState } from "react";

export default function NewsList() {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Usa la variable de entorno
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        const res = await fetch(`${API_URL}/noticias`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setNoticias(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchNoticias();
  }, [API_URL]);

  if (loading) return <p>Cargando noticias...</p>;
  if (error) return <p>Error al cargar noticias: {error}</p>;

  const destacada = noticias[0];
  const otrasNoticias = noticias.slice(1);

  return (
    <section className="news-section">
      {/* Noticia Destacada */}
      {destacada && (
        <article className="featured-card">
          <img
            src={`${API_URL.replace('/api', '')}/uploads/${destacada.imagen_destacada}`}
            alt={destacada.titulo}
            onError={(e) => e.target.src = "https://via.placeholder.com/800x400 "}
          />
          <div className="featured-content">
            <h3>{destacada.titulo}</h3>
            <p>{destacada.resumen || "Sin resumen disponible"}</p>
          </div>
        </article>
      )}

      {/* Otras noticias en grid */}
      <div className="card-grid">
        {otrasNoticias.map((news) => (
          <article key={news.id} className="card">
            <img
              src={`${API_URL.replace('/api', '')}/uploads/${news.imagen_destacada}`}
              alt={news.titulo}
              onError={(e) => e.target.src = "https://via.placeholder.com/400x200 "}
            />
            <div className="card-content">
              <h3>{news.titulo}</h3>
              <p>{news.resumen || "Sin resumen disponible"}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}