import React, { useState, useEffect } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import axios from 'axios';

const NoticiasCRUD = () => {
  const [titulo, setTitulo] = useState('');
  const [destacada, setDestacada] = useState(false);
  const [categoriaId, setCategoriaId] = useState('');
  const [subcategoriaId, setSubcategoriaId] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [subcategorias, setSubcategorias] = useState([]);
  const [imagenDestacada, setImagenDestacada] = useState(null);
  const [etiquetas, setEtiquetas] = useState('');

  const editor = useEditor({
    extensions: [StarterKit, Image],
    content: '',
  });

  useEffect(() => {
    axios.get('/api/categorias')
      .then(res => {
        console.log('Categorías recibidas:', res.data);
        setCategorias(res.data);
      })
      .catch(err => console.error('Error cargando categorías', err));
  }, []);

  useEffect(() => {
    if (categoriaId) {
      axios.get(`/api/subcategorias/${categoriaId}`)
        .then(res => setSubcategorias(res.data))
        .catch(err => console.error('Error cargando subcategorías', err));
    } else {
      setSubcategorias([]);
    }
  }, [categoriaId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append('titulo', titulo);
    formData.append('destacada', destacada);
    formData.append('categoria_id', categoriaId);
    formData.append('subcategoria_id', subcategoriaId);
    formData.append('contenido', editor.getHTML());
    formData.append('etiquetas', etiquetas);
    if (imagenDestacada) formData.append('imagenDestacada', imagenDestacada);

    try {
      await axios.post('/api/noticias', formData);
      alert('Noticia guardada');
    } catch (error) {
      console.error('Error guardando la noticia:', error);
      alert('Error al guardar la noticia');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Crear/Editar Noticia</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Título"
          className="w-full p-2 border rounded"
          required
        />

        <label className="flex items-center">
          <input
            type="checkbox"
            checked={destacada}
            onChange={(e) => setDestacada(e.target.checked)}
          />
          <span className="ml-2">Destacar noticia</span>
        </label>

        <select
          value={categoriaId}
          onChange={(e) => setCategoriaId(e.target.value)}
          required
          className="w-full p-2 border rounded"
        >
          <option value="">Seleccione categoría</option>
          {Array.isArray(categorias) &&
            categorias.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.nombre}</option>
            ))}
        </select>

        <select
          value={subcategoriaId}
          onChange={(e) => setSubcategoriaId(e.target.value)}
          required
          className="w-full p-2 border rounded"
        >
          <option value="">Seleccione subcategoría</option>
          {subcategorias.map(sub => (
            <option key={sub.id} value={sub.id}>{sub.nombre}</option>
          ))}
        </select>

        <EditorContent editor={editor} className="border p-2 rounded min-h-[200px]" />

        <input
          type="file"
          onChange={(e) => setImagenDestacada(e.target.files[0])}
        />

        <input
          type="text"
          value={etiquetas}
          onChange={(e) => setEtiquetas(e.target.value)}
          placeholder="Etiquetas (separadas por coma)"
          className="w-full p-2 border rounded"
        />

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Guardar Noticia
        </button>
      </form>
    </div>
  );
};

export default NoticiasCRUD;
