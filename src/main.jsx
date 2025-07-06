// Importa o React (necessário para JSX)
import React from 'react'

// Importa o ReactDOM para renderizar a aplicação na DOM
import ReactDOM from 'react-dom/client'

// Importa o sistema de rotas do React Router
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Importa os componentes das páginas
import App from './App.jsx'
import Home from './pages/Home.jsx'
import Pets from './pages/Pets.jsx'
import Clientes from './pages/Clientes.jsx'
import Agendamentos from './pages/Agendamentos.jsx'

// Importa o CSS global gerado pelo Tailwind
import './index.css'

// Cria a raiz da aplicação React e renderiza com suporte a rotas
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Envolve a aplicação com o sistema de rotas */}
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/pets" element={<Pets />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/agendamentos" element={<Agendamentos />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
