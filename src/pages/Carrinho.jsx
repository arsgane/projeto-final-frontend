// src/pages/Carrinho.jsx
import React from "react";
import { useCarrinho } from "../context/CarrinhoContext";

function Carrinho() {
  const {
    carrinho,
    removerProduto,
    limparCarrinho,
    valorTotal,
  } = useCarrinho();

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-white to-blue-100 py-10 px-6">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-10">
        Meu Carrinho
      </h1>

      {carrinho.length === 0 ? (
        <p className="text-center text-gray-600">Seu carrinho está vazio.</p>
      ) : (
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6 space-y-6">

          {/* Lista de itens adicionados (cada ação = uma linha) */}
          {carrinho.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b pb-4"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={item.imagem}
                  alt={item.nome}
                  className="w-20 h-20 object-contain rounded"
                />
                <div>
                  <h2 className="text-lg font-bold text-blue-800">
                    {item.nome}
                  </h2>
                  <p className="text-sm text-gray-600">
                    Preço unitário: R$ {item.preco.toFixed(2)}
                  </p>
                  <p className="text-sm font-semibold text-green-600">
                    Subtotal: R$ {(item.preco * item.quantidade).toFixed(2)}
                  </p>
                </div>
              </div>

              <button
                onClick={() => removerProduto(item.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Remover
              </button>
            </div>
          ))}

          {/* Rodapé com total e ações */}
          <div className="flex justify-between items-center pt-4 border-t">
            <h2 className="text-xl font-bold text-blue-700">
              Total: R$ {valorTotal.toFixed(2)}
            </h2>

            <div className="flex space-x-4">
              <button
                onClick={limparCarrinho}
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
              >
                Limpar Carrinho
              </button>

              <button
                onClick={() => alert("Compra finalizada com sucesso!")}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              >
                Finalizar Compra
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Carrinho;
