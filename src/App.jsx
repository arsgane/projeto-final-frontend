// src/App.jsx

import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Servicos from './pages/Servicos';
import LoginCliente from './pages/LoginCliente';
import CadastroCliente from './pages/CadastroCliente';
import Produtos from './pages/Produtos';
import ProdutoDetalhes from './pages/ProdutoDetalhes';
import Carrinho from './pages/Carrinho';
import Pets from './pages/Pets';
import Clientes from './pages/Clientes';
import Pagamento from './pages/Pagamento';
import Simplificado from './pages/simplificado';

import DashboardCliente from './pages/DashboardCliente';
import DashboardAdmin from './pages/DashboardAdmin';

import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <Toaster position="top-center" />

      <main className="flex-grow p-6">
        <Routes>
          {/* 🌐 ROTAS PÚBLICAS */}
          <Route path="/" element={<Home />} />
          <Route path="/servicos" element={<Servicos />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/produtos/:id" element={<ProdutoDetalhes />} />
          <Route path="/login-cliente" element={<LoginCliente />} />
          <Route path="/cadastro-cliente" element={<CadastroCliente />} />
          <Route path="/simplificado" element={<Simplificado />} />

          {/* 🔓 Carrinho acessível sem login */}
          <Route path="/carrinho" element={<Carrinho />} />

          {/* 🔒 ROTAS PROTEGIDAS - CLIENTE */}
          <Route
            path="/pets"
            element={
              <ProtectedRoute role="cliente">
                <Pets />
              </ProtectedRoute>
            }
          />
          <Route
            path="/pagamento"
            element={
              <ProtectedRoute role="cliente">
                <Pagamento />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cliente-dashboard"
            element={
              <ProtectedRoute role="cliente">
                <DashboardCliente />
              </ProtectedRoute>
            }
          />

          {/* 🔒 ROTAS PROTEGIDAS - ADMIN */}
          <Route
            path="/clientes"
            element={
              <ProtectedRoute role="admin">
                <Clientes />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <DashboardAdmin />
              </ProtectedRoute>
            }
          />

          {/* 🔄 ROTA GENÉRICA */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
