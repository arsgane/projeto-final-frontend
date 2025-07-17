// src/components/Navbar.jsx
import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useCarrinho } from "../context/CarrinhoContext";
import { ShoppingCart } from 'lucide-react'; // ✅ Ícone SVG do carrinho

function Navbar() {
  const [menuAberto, setMenuAberto] = useState(false);
  const { quantidadeTotal } = useCarrinho();

  const linkEstilo = ({ isActive }) =>
    isActive
      ? 'bg-blue-100 text-blue-900 font-semibold px-3 py-1 rounded transition'
      : 'text-white hover:bg-blue-500 px-3 py-1 rounded transition';

  return (
    <nav className="bg-blue-600 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-white">Petshop System</h1>

        {/* Botão hambúrguer mobile */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setMenuAberto(!menuAberto)}
          aria-label="Abrir menu"
        >
          ☰
        </button>

        {/* Menu desktop */}
        <div className="hidden md:flex space-x-4 items-center">
          <NavLink to="/" className={linkEstilo}>Início</NavLink>
          <NavLink to="/servicos" className={linkEstilo}>Serviços</NavLink>
          <NavLink to="/produtos" className={linkEstilo}>Produtos</NavLink>
          <NavLink to="/login" className={linkEstilo}>Login</NavLink>

          {/* ✅ Carrinho com ícone SVG estiloso */}
          <Link
            to="/carrinho"
            className="relative text-white hover:text-yellow-300 transition"
          >
            <ShoppingCart size={28} strokeWidth={2.5} />
            {quantidadeTotal > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {quantidadeTotal}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Menu mobile dropdown */}
      {menuAberto && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <NavLink to="/" className={linkEstilo} onClick={() => setMenuAberto(false)}>Início</NavLink>
          <NavLink to="/servicos" className={linkEstilo} onClick={() => setMenuAberto(false)}>Serviços</NavLink>
          <NavLink to="/produtos" className={linkEstilo} onClick={() => setMenuAberto(false)}>Produtos</NavLink>
          <NavLink to="/login" className={linkEstilo} onClick={() => setMenuAberto(false)}>Login</NavLink>

          {/* Carrinho no mobile também */}
          <Link
            to="/carrinho"
            className="flex items-center gap-2 text-white hover:text-yellow-300 transition"
            onClick={() => setMenuAberto(false)}
          >
            <ShoppingCart size={24} />
            Carrinho
            {quantidadeTotal > 0 && (
              <span className="ml-1 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {quantidadeTotal}
              </span>
            )}
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
