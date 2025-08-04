// src/services/petService.js
import axios from "axios";

// URL base da API Flask
const API_URL = "http://localhost:5000/pets";

// Função para buscar todos os pets
export const buscarPets = async () => {
  try {
    const resposta = await axios.get(API_URL);
    return resposta.data;
  } catch (erro) {
    console.error("Erro ao buscar pets:", erro);
    return [];
  }
};
