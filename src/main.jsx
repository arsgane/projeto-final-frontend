// Importa o React (necessário para o uso de JSX)
import React from 'react'

// Importa o ReactDOM para renderizar o React na página HTML
import ReactDOM from 'react-dom/client'

// Importa o componente de roteamento do React Router
import { BrowserRouter } from 'react-router-dom'

// Importa o componente principal da aplicação (que conterá as rotas e a Navbar)
import App from './App.jsx'

// Importa os estilos globais gerados pelo TailwindCSS
import './index.css'

// Renderiza a aplicação dentro da div com id="root" do index.html
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Envolve toda a aplicação com o BrowserRouter para ativar o sistema de rotas */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
