import React from 'react';
import NewsCard from '../components/NewsCard';

const Home = ({ news }) => {
    console.log('Noticias recibidas:', news); // 👈 Agrega esto
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Noticias Destacadas</h1>
      {news.length > 0 && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <NewsCard newsItem={news[0]} />  {/* Mostrar noticia destacada */}
          {news.slice(1).map((newsItem) => (
            <NewsCard key={newsItem.id} newsItem={newsItem} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
