// src/pages/simplificado/cryptoUtils.js
import CryptoJS from 'crypto-js';

// Chave secreta usada para criptografia AES
const secretKey = 'petshop-simplificado-top#2025';

// Função para criptografar dados (objeto ou array)
export function encryptData(data) {
  const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
  return ciphertext;
}

// Função para descriptografar os dados
export function decryptData(ciphertext) {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
  } catch (error) {
    console.error('Erro ao descriptografar os dados:', error);
    return null;
  }
}
