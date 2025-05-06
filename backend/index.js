// backend/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const multer = require('multer');
const fs = require('fs');

const noticiasRoutes = require('./routes/noticias');
const usuariosRoutes = require('./routes/usuarios');
const publicidadRoutes = require('./routes/publicidad');

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Verificar y crear carpeta de uploads si no existe
const uploadsPath = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath);
}

app.use('/api/noticias', noticiasRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/publicidad', publicidadRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
