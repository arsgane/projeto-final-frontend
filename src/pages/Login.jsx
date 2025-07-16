// src/pages/Login.jsx
import React, { useState } from "react";

function Login() {
  const [isLogin, setIsLogin] = useState(true); // Alterna entre login e cadastro

  // Troca entre formulários
  const toggleForm = () => setIsLogin(!isLogin);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-100 px-4">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md animate-fade-in">

        {/* Título dinâmico */}
        <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">
          {isLogin ? "Login no Sistema" : "Criar Nova Conta"}
        </h2>

        {/* Formulário de Login */}
        {isLogin ? (
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email ou Usuário
              </label>
              <input
                type="text"
                placeholder="Digite seu email"
                className="mt-1 w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Senha
              </label>
              <input
                type="password"
                placeholder="Digite sua senha"
                className="mt-1 w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-700 text-white py-2 rounded-md hover:bg-blue-800 transition-colors"
            >
              Entrar
            </button>
          </form>
        ) : (
          // Formulário de Cadastro
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nome completo
              </label>
              <input
                type="text"
                placeholder="Digite seu nome"
                className="mt-1 w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="Digite seu email"
                className="mt-1 w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Senha
              </label>
              <input
                type="password"
                placeholder="Crie uma senha"
                className="mt-1 w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirmar Senha
              </label>
              <input
                type="password"
                placeholder="Repita a senha"
                className="mt-1 w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              Cadastrar
            </button>
          </form>
        )}

        {/* Link para trocar de modo */}
        <p className="mt-6 text-center text-sm text-gray-600">
          {isLogin ? (
            <>
              Não tem conta?{" "}
              <button
                onClick={toggleForm}
                className="text-blue-700 hover:underline font-medium"
              >
                Cadastre-se
              </button>
            </>
          ) : (
            <>
              Já tem conta?{" "}
              <button
                onClick={toggleForm}
                className="text-blue-700 hover:underline font-medium"
              >
                Faça login
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}

export default Login;
