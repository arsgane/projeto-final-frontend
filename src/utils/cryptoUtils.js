// src/utils/cryptoUtils.js
import CryptoJS from 'crypto-js';

// 🔐 Chave única para o sistema inteiro
const secretKey = 'PetshopTopSegredo-2025!@#';

// Criptografa dados (objeto ou array)
export function encryptData(data) {
  const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
  return ciphertext;
}

// Descriptografa dados criptografados
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
