// src/pages/Pets.jsx

import React, { useEffect, useState } from "react";
import { buscarPets } from "../services/petService";
import axios from "axios";

function Pets() {
  const [pets, setPets] = useState([]);
  const [carregando, setCarregando] = useState(true);

  // Estados do formulário
  const [nome, setNome] = useState("");
  const [raca, setRaca] = useState("");
  const [idade, setIdade] = useState("");
  const [peso, setPeso] = useState("");
  const [especie, setEspecie] = useState("");

  // 🔐 Pega o cliente_id do localStorage (padrão do projeto)
  const clienteId = localStorage.getItem("cliente_id");
  const tipoUsuario = localStorage.getItem("tipoUsuario");

  useEffect(() => {
    carregarDados();
  }, []);

  // 🔄 Carrega pets do backend
  const carregarDados = async () => {
    try {
      const dados = await buscarPets();
      setPets(dados);
    } catch (erro) {
      console.error("Erro ao carregar pets:", erro);
    } finally {
      setCarregando(false);
    }
  };

  // 📤 Envia novo pet para o backend
  const cadastrarPet = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/pets", {
        nome,
        raca,
        idade: Number(idade),
        peso: Number(peso),
        especie,
        cliente_id: clienteId, // ✅ compatível com backend
      });

      // Limpa formulário
      setNome("");
      setRaca("");
      setIdade("");
      setPeso("");
      setEspecie("");

      carregarDados();
    } catch (erro) {
      console.error("Erro ao cadastrar pet:", erro);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-800">
        {tipoUsuario === "admin" ? "Pets Cadastrados" : "Meus Pets"}
      </h1>

      {/* Formulário de cadastro */}
      <form
        onSubmit={cadastrarPet}
        className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6 mb-10"
      >
        <h2 className="text-xl font-semibold mb-4 text-blue-700">Cadastrar Novo Pet</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Nome"
            className="border rounded px-4 py-2"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Raça"
            className="border rounded px-4 py-2"
            value={raca}
            onChange={(e) => setRaca(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Idade"
            className="border rounded px-4 py-2"
            value={idade}
            onChange={(e) => setIdade(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Peso (kg)"
            className="border rounded px-4 py-2"
            value={peso}
            onChange={(e) => setPeso(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Espécie"
            className="border rounded px-4 py-2"
            value={especie}
            onChange={(e) => setEspecie(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="mt-6 w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Cadastrar Pet
        </button>
      </form>

      {/* Lista de pets */}
      {carregando ? (
        <p className="text-center text-gray-600 text-lg">Carregando pets...</p>
      ) : pets.length === 0 ? (
        <p className="text-center text-red-600 text-lg">Nenhum pet encontrado.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pets.map((pet) => (
            <div
              key={pet.id}
              className="bg-white rounded-xl shadow-md p-4 border border-gray-200 hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold text-blue-700">{pet.nome}</h2>
              <p><strong>Raça:</strong> {pet.raca}</p>
              <p><strong>Idade:</strong> {pet.idade} anos</p>
              <p><strong>Peso:</strong> {pet.peso} kg</p>
              <p><strong>Espécie:</strong> {pet.especie}</p>
              <p><strong>ID do Dono:</strong> {pet.cliente_id}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Pets;
