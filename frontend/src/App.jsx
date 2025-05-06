// frontend/src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // 👈 IMPORTANTE
import App from './App.jsx';
import './index.css';

useEffect(() => {
  axios.get('/api/noticias')
    .then(response => {
      console.log('Noticias cargadas:', response.data);
      setNews(response.data);
    })
    .catch(error => {
      console.error('Error cargando noticias:', error);
    });
}, []);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> {/* 👈 necesario para que Routes funcione */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
