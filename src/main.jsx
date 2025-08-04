// Importa o React (necessário para o uso de JSX)
import React from 'react'

// Importa o ReactDOM para renderizar o React na página HTML
import ReactDOM from 'react-dom/client'

// Importa o componente de roteamento do React Router
import { BrowserRouter } from 'react-router-dom'

// Importa o componente principal da aplicação
import App from './App.jsx'

// Importa os estilos globais do TailwindCSS
import './index.css'

// ✅ Importa o Provider do contexto do carrinho
import { CarrinhoProvider } from './context/CarrinhoContext'

// Renderiza a aplicação dentro da div com id="root"
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Envolve tudo com CarrinhoProvider para o useCarrinho funcionar */}
    <CarrinhoProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CarrinhoProvider>
  </React.StrictMode>
)
