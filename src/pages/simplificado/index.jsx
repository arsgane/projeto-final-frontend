// src/pages/simplificado/index.jsx

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { encryptData, decryptData } from "../../utils/cryptoUtils";
import axios from "axios";

function IndexSimplificado() {
  const [nomePet, setNomePet] = useState("");
  const [especie, setEspecie] = useState("");
  const [servico, setServico] = useState("");
  const [data, setData] = useState("");
  const [hora, setHora] = useState("");

  const [pets, setPets] = useState([]);
  const [servicos, setServicos] = useState([]);
  const [agendamentos, setAgendamentos] = useState([]);

  // 🧠 Carrega dados salvos no localStorage (criptografado)
  useEffect(() => {
    const dataEncrypted = localStorage.getItem("simplificado-dados");
    if (dataEncrypted) {
      const data = JSON.parse(decryptData(dataEncrypted));
      setPets(data.pets || []);
      setServicos(data.servicos || []);
      setAgendamentos(data.agendamentos || []);
    }
  }, []);

  // 💾 Salva todos os dados de forma unificada
  const salvarTudo = (petsAtualizados, servicosAtualizados, agendamentosAtualizados) => {
    const dados = {
      pets: petsAtualizados,
      servicos: servicosAtualizados,
      agendamentos: agendamentosAtualizados,
    };
    localStorage.setItem("simplificado-dados", encryptData(JSON.stringify(dados)));
  };

  // 🐶 Cadastra Pet
  const cadastrarPet = () => {
    if (!nomePet || !especie) {
      toast.error("Preencha o nome e a espécie.");
      return;
    }

    const novo = { id: Date.now(), nomePet, especie };
    const atualizados = [...pets, novo];
    setPets(atualizados);
    salvarTudo(atualizados, servicos, agendamentos);
    setNomePet("");
    setEspecie("");
    toast.success("Pet salvo!");
  };

  // 🧼 Cadastra Serviço
  const cadastrarServico = () => {
    if (!servico) {
      toast.error("Digite o nome do serviço.");
      return;
    }

    const novo = { id: Date.now(), nome: servico };
    const atualizados = [...servicos, novo];
    setServicos(atualizados);
    salvarTudo(pets, atualizados, agendamentos);
    setServico("");
    toast.success("Serviço salvo!");
  };

  // 📅 Cadastra Agendamento
  const cadastrarAgendamento = () => {
    if (!data || !hora || pets.length === 0 || servicos.length === 0) {
      toast.error("Preencha todos os campos e cadastre pet e serviço antes.");
      return;
    }

    const novo = {
      id: Date.now(),
      data,
      hora,
      pet: pets[pets.length - 1].nomePet,
      servico: servicos[servicos.length - 1].nome,
    };

    const atualizados = [...agendamentos, novo];
    setAgendamentos(atualizados);
    salvarTudo(pets, servicos, atualizados);
    setData("");
    setHora("");
    toast.success("Agendamento salvo!");
  };

  // 🔄 Envia para o backend
  const enviarParaAPI = async () => {
    try {
      await axios.post("http://localhost:5000/api/simplificado/sincronizar", {
        pets,
        servicos,
        agendamentos,
      });
      toast.success("Enviado para o backend!");
    } catch {
      toast.error("Erro ao enviar para o backend.");
    }
  };

  // 🧹 Limpa todos os dados
  const limparTudo = () => {
    setPets([]);
    setServicos([]);
    setAgendamentos([]);
    localStorage.removeItem("simplificado-dados");
    toast.success("Dados locais apagados.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 via-white to-blue-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow space-y-6">
        <h1 className="text-2xl font-bold text-blue-700 text-center">
          Modo Simplificado (Criptografado)
        </h1>

        {/* Cadastro de Pet */}
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-blue-600">Cadastrar Pet</h2>
          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="text"
              placeholder="Nome do Pet"
              className="border p-2 rounded flex-1"
              value={nomePet}
              onChange={(e) => setNomePet(e.target.value)}
            />
            <input
              type="text"
              placeholder="Espécie"
              className="border p-2 rounded flex-1"
              value={especie}
              onChange={(e) => setEspecie(e.target.value)}
            />
            <button
              onClick={cadastrarPet}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Salvar Pet
            </button>
          </div>
        </div>

        {/* Cadastro de Serviço */}
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-blue-600">Cadastrar Serviço</h2>
          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="text"
              placeholder="Nome do Serviço"
              className="border p-2 rounded flex-1"
              value={servico}
              onChange={(e) => setServico(e.target.value)}
            />
            <button
              onClick={cadastrarServico}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Salvar Serviço
            </button>
          </div>
        </div>

        {/* Cadastro de Agendamento */}
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-blue-600">Cadastrar Agendamento</h2>
          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="date"
              className="border p-2 rounded"
              value={data}
              onChange={(e) => setData(e.target.value)}
            />
            <input
              type="time"
              className="border p-2 rounded"
              value={hora}
              onChange={(e) => setHora(e.target.value)}
            />
            <button
              onClick={cadastrarAgendamento}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Salvar Agendamento
            </button>
          </div>
        </div>

        {/* Lista de Agendamentos */}
        <div>
          <h2 className="text-lg font-semibold text-blue-600">Agendamentos:</h2>
          {agendamentos.length === 0 ? (
            <p className="text-gray-500">Nenhum agendamento registrado.</p>
          ) : (
            <ul className="list-disc pl-6">
              {agendamentos.map((ag) => (
                <li key={ag.id}>
                  {ag.data} às {ag.hora} - {ag.pet} / {ag.servico}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Ações */}
        <div className="flex flex-col md:flex-row gap-4 justify-between mt-6">
          <button
            onClick={limparTudo}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            Apagar Tudo
          </button>
          <button
            onClick={enviarParaAPI}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Enviar para Backend
          </button>
        </div>
      </div>
    </div>
  );
}

export default IndexSimplificado;
