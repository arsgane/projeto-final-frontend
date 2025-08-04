// src/pages/ProdutoDetalhes.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import { useCarrinho } from "../context/CarrinhoContext";

// ✅ Importação das imagens dos produtos
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

// ✅ Lista de produtos detalhada com campo 'tipo' incluído
const produtos = [
  { id: 1, nome: "Ração Golden", preco: 119.9, tipo: "produto", descricao: "Ração premium para cães adultos. Sabor carne e arroz.", imagem: racao1 },
  { id: 2, nome: "Coleira Antipulgas", preco: 65.0, tipo: "produto", descricao: "Proteção eficaz contra pulgas e carrapatos por até 3 meses.", imagem: coleira },
  { id: 3, nome: "Shampoo Pet Clean", preco: 24.9, tipo: "produto", descricao: "Limpeza suave e perfume duradouro para cães e gatos.", imagem: shampoo },
  { id: 4, nome: "Brinquedo Mordedor", preco: 34.9, tipo: "produto", descricao: "Ajuda na higiene bucal e reduz o estresse do pet.", imagem: mordedor },
  { id: 5, nome: "Ração Whiskas", preco: 59.9, tipo: "produto", descricao: "Ração balanceada para gatos adultos. Sabor peixe.", imagem: racao2 },
  { id: 6, nome: "Arranhador para Gatos", preco: 99.9, tipo: "produto", descricao: "Ideal para distrair e manter as garras afiadas.", imagem: arranhador },
  { id: 7, nome: "Comedouro Inox", preco: 39.9, tipo: "produto", descricao: "Tigela higiênica e resistente para ração ou água.", imagem: comedouro },
  { id: 8, nome: "Areia Higiênica", preco: 25.0, tipo: "produto", descricao: "Alta absorção e controle de odores para gatos.", imagem: areia },
  { id: 9, nome: "Tapete Higiênico", preco: 60.0, tipo: "produto", descricao: "Super absorvente com atrativo canino.", imagem: tapete },
  { id: 10, nome: "Cama Pet", preco: 119.9, tipo: "produto", descricao: "Maciez e conforto para o descanso dos pets.", imagem: cama },
  { id: 11, nome: "Perfume Lavanda", preco: 22.9, tipo: "produto", descricao: "Perfume suave e duradouro para animais.", imagem: perfume },
  { id: 12, nome: "Escova de Pelos", preco: 28.9, tipo: "produto", descricao: "Remove os pelos mortos e massageia o pet.", imagem: escova }
];

function ProdutoDetalhes() {
  const { id } = useParams();
  const { adicionarProduto } = useCarrinho();
  const produto = produtos.find((p) => p.id === parseInt(id));

  if (!produto) {
    return (
      <div className="p-6 text-center text-red-500 font-bold">
        Produto não encontrado.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-white to-blue-100 p-8">
      <div className="max-w-xl mx-auto bg-white rounded-lg shadow-lg p-6 text-center">
        <img
          src={produto.imagem}
          alt={produto.nome}
          className="w-48 h-48 object-contain mx-auto mb-4"
        />
        <h2 className="text-2xl font-bold text-gray-800">{produto.nome}</h2>
        <p className="text-lg text-green-600 font-semibold mt-2">
          R$ {produto.preco.toFixed(2)}
        </p>
        <p className="text-gray-600 mt-4">{produto.descricao}</p>

        {/* ✅ Botão de adicionar ao carrinho */}
        <button
          onClick={() => adicionarProduto(produto)}
          className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
        >
          Adicionar ao Carrinho
        </button>

        <Link
          to="/produtos"
          className="mt-4 ml-4 inline-block bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600 transition"
        >
          Voltar aos Produtos
        </Link>
      </div>
    </div>
  );
}

export default ProdutoDetalhes;
