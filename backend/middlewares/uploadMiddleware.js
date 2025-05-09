// backend/middlewares/uploadMiddleware.js
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/noticias/');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const name = file.originalname.replace(ext, '').replace(/\s+/g, '_');
    cb(null, `${Date.now()}_${name}${ext}`);
  },
});

const upload = multer({ storage });

module.exports = { upload };
