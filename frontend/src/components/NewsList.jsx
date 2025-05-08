import React from "react";

const mockNews = [
  {
    id: 1,
    title: "Noticia 1",
    subtitle: "Un resumen breve de la noticia 1",
    image: "https://via.placeholder.com/400x200",
  },
  {
    id: 2,
    title: "Noticia 2",
    subtitle: "Un resumen breve de la noticia 2",
    image: "https://via.placeholder.com/400x200",
  },
  {
    id: 3,
    title: "Noticia 3",
    subtitle: "Un resumen breve de la noticia 3",
    image: "https://via.placeholder.com/400x200",
  },
];

export default function NewsList() {
  return (
    <section className="w-full max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
        Últimas noticias
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockNews.map((news) => (
          <article
            key={news.id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
          >
            <img
              src={news.image}
              alt={news.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-blue-700">{news.title}</h3>
              <p className="text-gray-600 mt-2">{news.subtitle}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
