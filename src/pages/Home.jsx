// src/pages/Home.jsx
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCarrinho } from '../context/CarrinhoContext'; // ✅ Importa o contexto do carrinho

import dogWelcomeGif from '../assets/home1.gif';
import sobrePetGif from '../assets/cat02.gif';

// Imagens dos produtos
import racao2 from '../assets/produtos/racaowhiskas.png';
import arranhador from '../assets/produtos/arranhadorgatos.png';
import comedouro from '../assets/produtos/comedouro.png';
import areia from '../assets/produtos/areiagatos.png';
import tapete from '../assets/produtos/tapetehigienico.png';
import cama from '../assets/produtos/camafofa.png';
import perfume from '../assets/produtos/lavandapet.png';
import escova from '../assets/produtos/escovadepelo.png';
import racao1 from '../assets/produtos/racaogolden.png';
import coleira from '../assets/produtos/coleiraantipulga.png';
import shampoo from '../assets/produtos/shampoopet.png';
import mordedor from '../assets/produtos/mordedorosso.png';

// ✅ Produtos com preço como número
const produtos = [
  { id: 1, nome: "Ração Golden", preco: 119.9, imagem: racao1 },
  { id: 2, nome: "Coleira Antipulgas", preco: 69.9, imagem: coleira },
  { id: 3, nome: "Shampoo Pet Clean", preco: 24.9, imagem: shampoo },
  { id: 4, nome: "Brinquedo Mordedor", preco: 34.9, imagem: mordedor },
  { id: 5, nome: "Ração Whiskas", preco: 59.9, imagem: racao2 },
  { id: 6, nome: "Arranhador para Gatos", preco: 99.9, imagem: arranhador },
  { id: 7, nome: "Comedouro Inox", preco: 39.9, imagem: comedouro },
  { id: 8, nome: "Areia Higiênica", preco: 27.5, imagem: areia },
  { id: 9, nome: "Tapete Higiênico", preco: 60.0, imagem: tapete },
  { id: 10, nome: "Cama Pet", preco: 119.9, imagem: cama },
  { id: 11, nome: "Perfume Lavanda", preco: 22.9, imagem: perfume },
  { id: 12, nome: "Escova de Pelos", preco: 28.9, imagem: escova }
];

function Home() {
  const navigate = useNavigate();
  const { adicionarProduto } = useCarrinho(); // ✅ Usa o carrinho
  const [servicoAtivo, setServicoAtivo] = useState(null);
  const carrosselRef = useRef(null);

  const servicos = [
    { title: "Banho", text: "Higiene e cuidado com produtos de qualidade, deixando seu pet limpo e perfumado." },
    { title: "Tosa", text: "Tosa higiênica, na tesoura ou na máquina, sempre respeitando o estilo do seu pet." },
    { title: "Consulta", text: "Avaliação veterinária completa para garantir a saúde e bem-estar do seu pet." },
    { title: "Vacina", text: "Proteja seu pet com vacinas atualizadas e aplicadas por profissionais capacitados." },
    { title: "Agendamento", text: "Marque serviços com rapidez e praticidade para seu pet no melhor horário." },
    { title: "Hotel", text: "Hospedagem confortável e segura para o seu pet com atenção 24 horas." },
  ];

  const scrollCarrossel = (direcao) => {
    if (carrosselRef.current) {
      const largura = carrosselRef.current.offsetWidth / 1.5;
      carrosselRef.current.scrollBy({
        left: direcao === 'esquerda' ? -largura : largura,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-100 via-white to-blue-100 z-0"></div>

      <div className="relative z-10 text-gray-800">

        {/* Hero */}
        <section className="min-h-[80vh] flex flex-col md:flex-row items-center justify-center px-6 md:px-16">
          <div className="md:w-1/2 flex justify-center mb-8 md:mb-0">
            <img src={dogWelcomeGif} alt="Dog animado" className="w-96 md:w-[600px]" />
          </div>
          <div className="md:w-1/2 text-center md:text-left animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-4">Bem-vindo ao Petshop</h1>
            <p className="text-lg text-gray-700 mb-6">
              Cuidando do seu pet com amor, carinho e profissionalismo. Agende agora!
            </p>
            <button
              onClick={() => navigate('/login')}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded shadow-md transition-transform hover:scale-105"
            >
              Login
            </button>
          </div>
        </section>

        {/* Produtos */}
        <section className="pt-4 pb-24 px-6 text-center animate-fade-up">
          <h2 className="text-2xl font-bold text-blue-600 mb-6">Produtos</h2>
          <button
            onClick={() => navigate('/produtos')}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 mb-8 rounded shadow-md transition"
          >
            Ver todos os produtos
          </button>

          <div className="relative max-w-7xl mx-auto mt-10">
            {/* Seta esquerda */}
            <button
              onClick={() => scrollCarrossel('esquerda')}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-xl text-2xl px-3 py-1 rounded-full z-10 hover:bg-blue-200 hover:scale-110 transition"
              aria-label="Voltar"
            >
              ❮
            </button>

            {/* Lista de produtos com botão de carrinho */}
            <div
              ref={carrosselRef}
              className="overflow-x-auto whitespace-nowrap flex gap-6 px-10 scroll-smooth no-scrollbar"
            >
              {produtos.map((produto) => (
                <div
                  key={produto.id}
                  className="inline-block w-52 bg-white shadow-lg rounded-2xl p-4 hover:scale-105 transition transform duration-300 text-center"
                >
                  <img
                    src={produto.imagem}
                    alt={produto.nome}
                    className="w-32 h-32 object-contain rounded-full mx-auto mb-3 bg-white"
                  />
                  <h3 className="text-base font-semibold text-blue-700">{produto.nome}</h3>
                  <p className="text-green-600 text-sm font-bold">R$ {produto.preco.toFixed(2)}</p>

                  {/* Botão Ver Detalhes */}
                  <button
                    onClick={() => navigate(`/produtos/${produto.id}`)}
                    className="mt-2 bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded text-sm transition"
                  >
                    Ver Detalhes
                  </button>

                  {/* ✅ Botão Adicionar ao Carrinho */}
                  <button
                    onClick={() => adicionarProduto(produto)}
                    className="mt-2 bg-green-600 hover:bg-green-700 text-white py-1 px-3 rounded text-sm transition"
                  >
                    Carrinho
                  </button>
                </div>
              ))}
            </div>

            {/* Seta direita */}
            <button
              onClick={() => scrollCarrossel('direita')}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-xl text-2xl px-3 py-1 rounded-full z-10 hover:bg-blue-200 hover:scale-110 transition"
              aria-label="Avançar"
            >
              ❯
            </button>
          </div>
        </section>

        {/* Serviços */}
        <section className="py-20 px-6 text-center animate-fade-up">
          <h2 className="text-2xl font-bold text-blue-600 mb-12">Nossos Serviços</h2>
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div className="space-y-4">
              {servicos.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setServicoAtivo(item.title)}
                  onDoubleClick={() => navigate(`/servicos?abrir=${encodeURIComponent(item.title)}`)}
                  className={`block w-full text-left px-4 py-2 rounded shadow-sm transition duration-300 
                    ${servicoAtivo === item.title
                      ? 'bg-blue-200 text-blue-800 font-bold'
                      : 'bg-white hover:bg-blue-100'}`}
                >
                  {item.title}
                </button>
              ))}
            </div>

            <div className="bg-white shadow-md rounded p-6 min-h-[160px] transition duration-300">
              {servicoAtivo ? (
                <div>
                  <h3 className="text-xl font-semibold text-blue-700 mb-2">
                    {servicoAtivo}
                  </h3>
                  <p className="text-gray-700">
                    {servicos.find(item => item.title === servicoAtivo)?.text}
                  </p>
                  <button
                    onClick={() => navigate(`/servicos?abrir=${encodeURIComponent(servicoAtivo)}`)}
                    className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-1 px-4 rounded transition"
                  >
                    Ver Preços
                  </button>
                </div>
              ) : (
                <p className="text-gray-500">Selecione um serviço para ver os detalhes.</p>
              )}
            </div>
          </div>
        </section>

        {/* Sobre Nós */}
        <section className="py-20 px-6 animate-fade-up">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl font-bold text-blue-600 mb-4">Sobre Nós</h2>
              <p className="text-gray-700 mb-4">
                Somos um petshop comprometido com o bem-estar e a saúde dos animais. Nossa missão é oferecer
                serviços de qualidade, atendimento humanizado e um ambiente acolhedor para pets e tutores.
              </p>
              <p className="text-gray-600">
                Nossa equipe é formada por profissionais experientes e apaixonados por animais.
                Desde banhos e tosa até consultas e agendamentos, estamos aqui para cuidar com amor.
              </p>
            </div>
            <div className="flex justify-end pr-8 md:pr-0">
              <img
                src={sobrePetGif}
                alt="Gato animado andando"
                className="w-32 md:w-40 animate-walkSideways"
              />
            </div>
          </div>
        </section>

        {/* Fale Conosco */}
        <section className="py-16 px-6 animate-fade-up">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-semibold mb-4">Fale Conosco</h2>
            <p className="text-gray-600 mb-6">
              Nossa equipe está sempre pronta para te atender com carinho e agilidade.
            </p>
            <div className="inline-block text-left mx-auto space-y-2">
              <a
                href="mailto:petsystem123@gmail.com"
                className="flex items-center gap-2 hover:text-blue-600 transition"
                target="_blank" rel="noopener noreferrer"
              >
                📧 petsystem123@gmail.com
              </a>
              <a
                href="https://www.instagram.com/petsystem123"
                className="flex items-center gap-2 hover:text-pink-600 transition"
                target="_blank" rel="noopener noreferrer"
              >
                📷 @petsystem123
              </a>
              <a
                href="https://wa.me/5581999999999"
                className="flex items-center gap-2 hover:text-green-600 transition"
                target="_blank" rel="noopener noreferrer"
              >
                📞 (81) 99999-9999
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
