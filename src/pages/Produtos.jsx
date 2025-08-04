// src/pages/Produtos.jsx
import React from "react";
import { Link } from "react-router-dom";

// ✅ Importações das imagens dos produtos
import racao1 from "../assets/produtos/racaogolden.png";
import coleira from "../assets/produtos/coleiraantipulga.png";
import shampoo from "../assets/produtos/shampoopet.png";
import mordedor from "../assets/produtos/mordedorosso.png";
import racao2 from "../assets/produtos/racaowhiskas.png";
import arranhador from "../assets/produtos/arranhadorgatos.png";
import comedouro from "../assets/produtos/comedouro.png";
import areia from "../assets/produtos/areiagatos.png";
import tapete from "../assets/produtos/tapetehigienico.png";
import cama from "../assets/produtos/camafofa.png";
import perfume from "../assets/produtos/lavandapet.png";
import escova from "../assets/produtos/escovadepelo.png";

// ✅ Importação do contexto do carrinho
import { useCarrinho } from "../context/CarrinhoContext";

// ✅ Lista de produtos com dados e campo 'tipo'
const produtos = [
  { id: 1, nome: "Ração Golden", preco: 119.9, tipo: "produto", imagem: racao1 },
  { id: 2, nome: "Coleira Antipulgas", preco: 65.0, tipo: "produto", imagem: coleira },
  { id: 3, nome: "Shampoo Pet Clean", preco: 24.9, tipo: "produto", imagem: shampoo },
  { id: 4, nome: "Brinquedo Mordedor", preco: 34.9, tipo: "produto", imagem: mordedor },
  { id: 5, nome: "Ração Whiskas", preco: 59.9, tipo: "produto", imagem: racao2 },
  { id: 6, nome: "Arranhador para Gatos", preco: 99.9, tipo: "produto", imagem: arranhador },
  { id: 7, nome: "Comedouro Inox", preco: 39.9, tipo: "produto", imagem: comedouro },
  { id: 8, nome: "Areia Higiênica", preco: 25.0, tipo: "produto", imagem: areia },
  { id: 9, nome: "Tapete Higiênico", preco: 60.0, tipo: "produto", imagem: tapete },
  { id: 10, nome: "Cama Pet", preco: 119.9, tipo: "produto", imagem: cama },
  { id: 11, nome: "Perfume Lavanda", preco: 22.9, tipo: "produto", imagem: perfume },
  { id: 12, nome: "Escova de Pelos", preco: 28.9, tipo: "produto", imagem: escova }
];

function Produtos() {
  // 🔗 Acessa o contexto do carrinho
  const { adicionarProduto } = useCarrinho();

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-white to-blue-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-700">Nossos Produtos</h1>

      {/* Grade responsiva de produtos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {produtos.map((produto) => (
          <div
            key={produto.id}
            className="bg-white rounded-xl shadow-md p-4 w-full sm:w-60 mx-auto flex flex-col items-center text-center hover:scale-105 transition"
          >
            <img
              src={produto.imagem}
              alt={produto.nome}
              className="w-28 h-28 object-contain rounded-full mb-3 bg-white"
            />

            <h2 className="text-lg font-semibold text-gray-800">{produto.nome}</h2>
            <p className="text-base text-green-600 font-bold mt-1">
              R$ {produto.preco.toFixed(2)}
            </p>

            {/* Botão Ver Detalhes */}
            <Link to={`/produtos/${produto.id}`}>
              <button className="mt-3 bg-blue-600 text-white px-4 py-1.5 rounded-xl hover:bg-blue-700 transition">
                Ver Detalhes
              </button>
            </Link>

            {/* ✅ Botão Adicionar ao Carrinho */}
            <button
              onClick={() => adicionarProduto(produto)}
              className="mt-2 bg-green-600 text-white px-4 py-1.5 rounded-xl hover:bg-green-700 transition"
            >
              Adicionar ao Carrinho
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Produtos;
