// src/admin/NoticiasCRUD.jsx
import React, { useEffect, useState, useRef } from "react";
import axios from "../api/axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const API_BASE = import.meta.env.VITE_API_BASE_URL;
console.log("API_BASE", API_BASE);

const NoticiasCRUD = () => {
  const [noticias, setNoticias] = useState([]);
  const [formulario, setFormulario] = useState({
    titulo: "",
    resumen: "",
    contenido: "",
    autor: "Administrador", // ⚠️ reemplazar luego por usuario autenticado
    categoria: "",
    subcategoria: "",
    etiquetas: "",
    destacada: false,
  });

  const [imagenPrincipal, setImagenPrincipal] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const inputImagenRef = useRef(null);
  const mensajeRef = useRef(null);

  const cargarNoticias = async () => {
    try {
      const res = await axios.get("/api/noticias");
      const ordenadas = res.data.sort(
        (a, b) => new Date(b.fecha_publicacion) - new Date(a.fecha_publicacion)
      );
      setNoticias(ordenadas);
    } catch (err) {
      console.error("Error al cargar noticias", err);
    }
  };

  useEffect(() => {
    cargarNoticias();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormulario({
      ...formulario,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleContenidoChange = (value) => {
    setFormulario((prev) => ({ ...prev, contenido: value }));
  };

  const limpiarFormulario = () => {
    setFormulario({
      titulo: "",
      resumen: "",
      contenido: "",
      autor: "Administrador",
      categoria: "",
      subcategoria: "",
      etiquetas: "",
      destacada: false,
    });
    setImagenPrincipal(null);
    if (inputImagenRef.current) inputImagenRef.current.value = null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imagenPrincipal) {
      setMensaje("⚠️ Debes seleccionar una imagen principal");
      return;
    }

    const formData = new FormData();
    for (const key in formulario) {
      formData.append(key, formulario[key]);
    }
    formData.append("fecha_publicacion", new Date().toISOString());
    formData.append("imagen_principal", imagenPrincipal);

    try {
      await axios.post(`${API_BASE}/api/noticias/con-imagenes`, formData);
      setMensaje("✅ Noticia guardada con éxito");
      limpiarFormulario();
      cargarNoticias();
      setTimeout(() => setMensaje(""), 3000);
    } catch (error) {
      console.error("Error al guardar la noticia:", error);
      setMensaje("❌ Error al guardar la noticia");
    }

    if (mensajeRef.current) {
      mensajeRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      const formData = new FormData();
      formData.append("image", file);

      try {
        const res = await axios.post("/api/upload", formData);
        const imageUrl = res.data.url;
        const quill = document.querySelector(".ql-editor");
        const range = window.getSelection().getRangeAt(0);
        const img = document.createElement("img");
        img.src = imageUrl;
        img.style.maxWidth = "250px";
        img.style.maxHeight = "300px";
        range.insertNode(img);
      } catch (err) {
        console.error("Error subiendo imagen:", err);
      }
    };
  };

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image"],
        ["clean"],
      ],
      handlers: {
        image: imageHandler,
      },
    },
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📰 Crear Noticia</h1>

      {mensaje && (
        <div
          ref={mensajeRef}
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded shadow z-50"
        >
          {mensaje}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow space-y-4"
        encType="multipart/form-data"
      >
        <input
          type="text"
          name="titulo"
          placeholder="Título"
          value={formulario.titulo}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <textarea
          name="resumen"
          placeholder="Resumen"
          value={formulario.resumen}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          rows="2"
          required
        />

        <ReactQuill
          theme="snow"
          value={formulario.contenido}
          onChange={handleContenidoChange}
          modules={modules}
          className="bg-white rounded"
        />

        <input
          type="file"
          accept="image/*"
          ref={inputImagenRef}
          onChange={(e) => setImagenPrincipal(e.target.files[0])}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="text"
          name="etiquetas"
          placeholder="Etiquetas (separadas por coma)"
          value={formulario.etiquetas}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="destacada"
            checked={formulario.destacada}
            onChange={handleChange}
          />
          <span>Destacada</span>
        </label>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Guardar Noticia
        </button>
      </form>

      <h2 className="text-xl font-semibold mt-8 mb-2">🗂 Noticias Guardadas</h2>
      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">Imagen</th>
            <th className="p-2">Título</th>
            <th className="p-2">Fecha</th>
            <th className="p-2">Destacada</th>
          </tr>
        </thead>
        <tbody>
          {noticias.map((n) => (
            <tr key={n.id} className="border-t">
              <td className="p-2">
                {n.imagen_principal && (
                  <img
                    src={`${API_BASE}${n.imagen_principal}`}
                    alt="miniatura"
                    className="w-20 h-14 object-cover rounded"
                  />
                )}
              </td>
              <td className="p-2">{n.titulo}</td>
              <td className="p-2">
                {new Date(n.fecha_publicacion).toLocaleString()}
              </td>
              <td className="p-2">{n.destacada ? "✅" : "❌"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NoticiasCRUD;
