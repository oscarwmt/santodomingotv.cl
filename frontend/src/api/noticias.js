import { useEffect, useState } from "react";
import { obtenerNoticias } from "@/api/noticias";

export default function Noticias() {
  const [noticias, setNoticias] = useState([]);

  useEffect(() => {
    const cargar = async () => {
      try {
        const data = await obtenerNoticias();
        setNoticias(data);
      } catch (err) {
        console.error("Error al cargar noticias:", err);
      }
    };
    cargar();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {noticias.map((noticia) => (
        <div key={noticia.id} className="bg-white shadow rounded p-4">
          <h2 className="text-xl font-bold">{noticia.titulo}</h2>
          <p className="text-sm text-gray-500">{noticia.fecha}</p>
          <img
            src={noticia.imagen_destacada}
            alt={noticia.titulo}
            className="w-full h-48 object-cover mt-2"
          />
          <p className="mt-2">{noticia.descripcion}</p>
        </div>
      ))}
    </div>
  );
}
