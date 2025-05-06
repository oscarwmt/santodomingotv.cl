import React from 'react';
import { Link } from 'react-router-dom';

const NewsCard = ({ newsItem }) => {
  return (
    <div className="bg-white p-4 rounded-md shadow-lg">
      <img src={newsItem.imagenDestacada} alt={newsItem.titulo} className="w-full h-48 object-cover rounded-md" />
      <h3 className="text-xl font-semibold mt-2">{newsItem.titulo}</h3>
      <p className="text-gray-500 mt-1">{newsItem.descripcion}</p>
      <Link to={`/news/${newsItem.id}`} className="text-blue-600 mt-2 inline-block">Ver más</Link>
    </div>
  );
};

export default NewsCard;
