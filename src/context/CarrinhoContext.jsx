import React, { createContext, useState, useContext, useEffect } from "react";

const CarrinhoContext = createContext();

export const CarrinhoProvider = ({ children }) => {
  const [carrinho, setCarrinho] = useState([]);

  // Carrega do localStorage ao iniciar (para visitante)
  useEffect(() => {
    const local = localStorage.getItem("carrinho");
    const dados = local ? JSON.parse(local) : [];
    setCarrinho(dados);
  }, []);

  // Salva no localStorage sempre que o carrinho muda (visitante)
  useEffect(() => {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
  }, [carrinho]);

  // Função para recarregar o carrinho do backend
  const recarregarCarrinho = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const response = await fetch("http://localhost:5000/carrinho", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setCarrinho(data.itens);
      }
    } catch (error) {
      console.error("Erro ao recarregar carrinho:", error);
    }
  };

  // Adiciona produto (com integração backend para usuário logado)
  const adicionarProduto = async (produto) => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        await fetch("http://localhost:5000/carrinho", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            nome: produto.nome,
            tipo: produto.tipo,
            preco: produto.preco,
            quantidade: 1,
          }),
        });
        // Atualiza o estado local após a inclusão no backend
        await recarregarCarrinho();
      } catch (erro) {
        console.error("Erro ao adicionar item para usuário logado:", erro);
      }
    } else {
      setCarrinho((prev) => [
        ...prev,
        {
          ...produto,
          quantidade: 1,
          id: crypto.randomUUID(),
        },
      ]);
    }
  };

  // Remove item por ID localmente e no backend para logado
  const removerProduto = async (id) => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        await fetch(`http://localhost:5000/carrinho/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        await recarregarCarrinho();
      } catch (error) {
        console.error("Erro ao remover item do carrinho logado:", error);
      }
    } else {
      setCarrinho((prev) => prev.filter((produto) => produto.id !== id));
    }
  };

  // Limpa carrinho local e localStorage e backend para logado
  const limparCarrinho = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        await fetch("http://localhost:5000/carrinho/limpar", {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.error("Erro ao limpar carrinho logado:", error);
      }
    }
    setCarrinho([]);
    localStorage.removeItem("carrinho");
  };

  // Quantidade total (ícone)
  const quantidadeTotal = carrinho.length;

  // Soma valor total
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
        valorTotal,
        recarregarCarrinho,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
};

export const useCarrinho = () => useContext(CarrinhoContext);
