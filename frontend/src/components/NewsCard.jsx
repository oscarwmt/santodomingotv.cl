export default function NewsCard({ noticia }) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <img
        src={`/uploads/${noticia.imagen_destacada}`}
        alt={noticia.titulo}
        className="w-full h-48 object-cover rounded"
      />
      <h2 className="text-xl font-bold mt-2">{noticia.titulo}</h2>
      <p className="text-gray-600 text-sm">{noticia.creado_en?.slice(0, 10)}</p>
      <p className="mt-2">{noticia.contenido.slice(0, 100)}...</p>
    </div>
  );
}
