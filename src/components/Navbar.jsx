// Importa useState para controlar abertura do menu
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  // Estado que controla se o menu mobile está aberto ou fechado
  const [menuAberto, setMenuAberto] = useState(false);

  // Função que define o estilo de cada link dependendo se está ativo
  const linkEstilo = ({ isActive }) =>
    isActive
      ? 'bg-blue-100 text-blue-900 font-semibold px-3 py-1 rounded transition'
      : 'text-white hover:bg-blue-500 px-3 py-1 rounded transition';

  return (
    <nav className="bg-blue-600 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Título do sistema */}
        <h1 className="text-xl font-bold text-white">Petshop System</h1>

        {/* Botão de menu para telas pequenas (hambúrguer) */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setMenuAberto(!menuAberto)}
          aria-label="Abrir menu"
        >
          ☰
        </button>

        {/* Menu de navegação - visível em telas médias e grandes */}
        <div className="hidden md:flex space-x-2">
          <NavLink to="/" className={linkEstilo}>Início</NavLink>
          <NavLink to="/servicos" className={linkEstilo}>Serviços</NavLink>
        </div>
      </div>

      {/* Menu dropdown - visível somente no mobile quando aberto */}
      {menuAberto && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <NavLink to="/" className={linkEstilo} onClick={() => setMenuAberto(false)}>Início</NavLink>
          <NavLink to="/servicos" className={linkEstilo} onClick={() => setMenuAberto(false)}>Serviços</NavLink>
          <NavLink to="/login" className={linkEstilo} onClick={() => setMenuAberto(false)}>Login</NavLink>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
