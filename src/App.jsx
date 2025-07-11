// Importa os componentes de roteamento do React Router
import { Routes, Route } from 'react-router-dom';

// Importa os componentes visuais do sistema
import Navbar from './components/Navbar';
import Footer from './components/Footer'; // ⬅️ Novo import do rodapé

// Importa as páginas principais do sistema
import Home from './pages/Home';
import Servicos from './pages/Servicos';
import Login from './pages/desativadas/Login';

// Páginas desativadas por enquanto (manter para uso futuro)
// import Pets from './pages/desativadas/Pets';
// import Clientes from './pages/desativadas/Clientes';
// import Agendamentos from './pages/desativadas/Agendamentos';

// Função principal da aplicação
function App() {
  return (
    // Container principal com flexbox em coluna para manter o footer no final da página
    <div className="min-h-screen flex flex-col bg-white">

      {/* Navbar no topo do site */}
      <Navbar />

      {/* Conteúdo principal da página com expansão automática para ocupar o espaço disponível */}
      <main className="flex-grow p-6">
        <Routes>
          {/* Rota para a página inicial */}
          <Route path="/" element={<Home />} />

          {/* Rota para a página de Serviços */}
          <Route path="/servicos" element={<Servicos />} />

          {/* Rota para a página de Login */}
          <Route path="/login" element={<Login />} />

          {/* Rotas desativadas temporariamente (rever após login/autenticação)
          <Route path="/pets" element={<Pets />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/agendamentos" element={<Agendamentos />} />
          */}
        </Routes>
      </main>

      {/* Rodapé no final da página */}
      <Footer />
    </div>
  );
}

// Exporta o componente para ser usado no main.jsx
export default App;
