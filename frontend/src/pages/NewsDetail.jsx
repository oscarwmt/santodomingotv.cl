import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const NewsDetail = () => {
  const { id } = useParams();
  const [newsDetail, setNewsDetail] = useState(null);

  useEffect(() => {
    axios.get(`/api/noticias/${id}`)
      .then(response => setNewsDetail(response.data))
      .catch(error => console.error('Error cargando el detalle de la noticia:', error));
  }, [id]);

  if (!newsDetail) return <p>Cargando...</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold">{newsDetail.titulo}</h1>
      <img src={newsDetail.imagenDestacada} alt={newsDetail.titulo} className="w-full h-72 object-cover mt-4" />
      <p>{newsDetail.descripcion}</p>
      <div className="mt-4">
        {newsDetail.imagenes.map((img, index) => (
          <img key={index} src={img} alt={`Imagen ${index + 1}`} className="w-full mt-2 rounded-md" />
        ))}
      </div>
    </div>
  );
};

export default NewsDetail;
