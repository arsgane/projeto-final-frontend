// src/context/CarrinhoContext.jsx
import React, { createContext, useState, useContext } from "react";

// Cria o contexto
const CarrinhoContext = createContext();

// Provider do contexto
export const CarrinhoProvider = ({ children }) => {
  const [carrinho, setCarrinho] = useState([]);

  // ✅ Agora cada item é adicionado separadamente (sem agrupar)
  const adicionarProduto = (produto) => {
    setCarrinho((prev) => [
      ...prev,
      {
        ...produto,
        quantidade: 1,
        id: Date.now() + Math.random(), // 🔑 Garante ID único para cada entrada
      },
    ]);
  };

  // Remove item por ID único
  const removerProduto = (id) => {
    setCarrinho((prev) =>
      prev.filter((produto) => produto.id !== id)
    );
  };

  // Limpa todo o carrinho
  const limparCarrinho = () => {
    setCarrinho([]);
  };

  // Soma total de unidades (para ícone)
  const quantidadeTotal = carrinho.length;

  // Soma total de valor
  const valorTotal = carrinho.reduce(
    (total, item) => total + item.preco * item.quantidade,
    0
  );

  return (
    <CarrinhoContext.Provider
      value={{
        carrinho,
        adicionarProduto,
        removerProduto,
        limparCarrinho,
        quantidadeTotal,
        valorTotal
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
};

// Hook personalizado para uso do carrinho
export const useCarrinho = () => useContext(CarrinhoContext);
