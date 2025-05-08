import { useEffect, useState } from "react";
import { obtenerNoticias } from "@/api/noticias";
import NewsCard from "./NewsCard";

export default function NewsGrid() {
  const [noticias, setNoticias] = useState([]);

  useEffect(() => {
    const cargarNoticias = async () => {
      const data = await obtenerNoticias();
      setNoticias(data);
    };
    cargarNoticias();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {noticias.map((noticia) => (
        <NewsCard key={noticia.id} noticia={noticia} />
      ))}
    </div>
  );
}
