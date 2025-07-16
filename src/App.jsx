// Importa os componentes de roteamento do React Router
import { Routes, Route } from 'react-router-dom';

// Importa os componentes visuais do sistema
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Importa as páginas principais ativas
import Home from './pages/Home';
import Servicos from './pages/Servicos';
import Login from './pages/Login'; // ✅ Corrigido: agora está fora da pasta "desativadas"

// Páginas desativadas por enquanto (manter para uso futuro)
// import Pets from './pages/desativadas/Pets';
// import Clientes from './pages/desativadas/Clientes';
// import Agendamentos from './pages/desativadas/Agendamentos';

// Função principal da aplicação
function App() {
  return (
    // Container principal com flexbox em coluna para manter o footer no fim da tela
    <div className="min-h-screen flex flex-col bg-white">

      {/* Barra de navegação no topo */}
      <Navbar />

      {/* Conteúdo principal da aplicação */}
      <main className="flex-grow p-6">
        <Routes>
          {/* Página inicial */}
          <Route path="/" element={<Home />} />

          {/* Página de serviços */}
          <Route path="/servicos" element={<Servicos />} />

          {/* Página de login/cadastro */}
          <Route path="/login" element={<Login />} />

          {/* Rotas futuras (desativadas) */}
          {/*
          <Route path="/pets" element={<Pets />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/agendamentos" element={<Agendamentos />} />
          */}
        </Routes>
      </main>

      {/* Rodapé fixo no final */}
      <Footer />
    </div>
  );
}

// Exporta o componente principal da aplicação
export default App;
