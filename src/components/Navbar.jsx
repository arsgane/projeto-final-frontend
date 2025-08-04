// src/components/Navbar.jsx

import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useCarrinho } from "../context/CarrinhoContext";

function Navbar() {
  const navigate = useNavigate();
  const [menuAberto, setMenuAberto] = useState(false);
  const [estaLogado, setEstaLogado] = useState(false);
  const [tipoUsuario, setTipoUsuario] = useState("");
  const { quantidadeTotal } = useCarrinho();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const tipo = localStorage.getItem("tipoUsuario");
    setEstaLogado(!!token);
    setTipoUsuario(tipo);
  }, [localStorage.getItem("token"), localStorage.getItem("tipoUsuario"), quantidadeTotal]);

  const deslogar = () => {
    localStorage.clear();
    setEstaLogado(false);
    navigate("/");
  };

  const linkEstilo = "text-white hover:text-yellow-300 transition font-medium";

  return (
    <nav className="bg-blue-700 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div
          className="text-2xl font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          Petshop
        </div>

        <div className="hidden md:flex gap-6 items-center">
          <NavLink to="/" className={linkEstilo}>
            Início
          </NavLink>

          {!estaLogado && (
            <NavLink to="/login-cliente" className={linkEstilo}>
              Login
            </NavLink>
          )}

          <NavLink to="/produtos" className={linkEstilo}>
            Produtos
          </NavLink>
          <NavLink to="/servicos" className={linkEstilo}>
            Serviços
          </NavLink>

          {estaLogado && tipoUsuario === "admin" && (
            <NavLink to="/simplificado" className={linkEstilo}>
              Modo Simplificado
            </NavLink>
          )}

          {estaLogado && (
            <>
              <NavLink
                to={tipoUsuario === "admin" ? "/admin" : "/cliente-dashboard"}
                className={linkEstilo}
              >
                Painel
              </NavLink>
              <button onClick={deslogar} className={linkEstilo}>
                Sair
              </button>
            </>
          )}

          <div
            className="relative cursor-pointer"
            onClick={() => navigate("/carrinho")}
          >
            <ShoppingCart />
            {quantidadeTotal > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-xs px-2 py-0.5 rounded-full">
                {quantidadeTotal}
              </span>
            )}
          </div>
        </div>

        {/* Menu mobile (hambúrguer) */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setMenuAberto(!menuAberto)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {menuAberto ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Menu Mobile */}
      {menuAberto && (
        <div className="md:hidden flex flex-col gap-4 mt-4 px-4">
          <NavLink to="/" className={linkEstilo} onClick={() => setMenuAberto(false)}>
            Início
          </NavLink>

          {!estaLogado && (
            <NavLink
              to="/login-cliente"
              className={linkEstilo}
              onClick={() => setMenuAberto(false)}
            >
              Login
            </NavLink>
          )}

          <NavLink to="/produtos" className={linkEstilo} onClick={() => setMenuAberto(false)}>
            Produtos
          </NavLink>
          <NavLink to="/servicos" className={linkEstilo} onClick={() => setMenuAberto(false)}>
            Serviços
          </NavLink>

          {estaLogado && tipoUsuario === "admin" && (
            <NavLink
              to="/simplificado"
              className={linkEstilo}
              onClick={() => setMenuAberto(false)}
            >
              Modo Simplificado
            </NavLink>
          )}

          {estaLogado && (
            <>
              <NavLink
                to={tipoUsuario === "admin" ? "/admin" : "/cliente-dashboard"}
                className={linkEstilo}
                onClick={() => setMenuAberto(false)}
              >
                Painel
              </NavLink>
              <button onClick={deslogar} className={linkEstilo}>
                Sair
              </button>
            </>
          )}

          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => {
              navigate("/carrinho");
              setMenuAberto(false);
            }}
          >
            <ShoppingCart />
            {quantidadeTotal > 0 && (
              <span className="bg-red-600 text-xs px-2 py-0.5 rounded-full">
                {quantidadeTotal}
              </span>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
