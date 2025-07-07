'use client';

import axios from 'axios';

export default async function verifyToken(token) {
  console.log(token)
  if (!token) {
    console.error('Token não encontrado no localStorage');
    return false;
  }
  try {

    const response = await axios.post('http://127.0.0.1:3048/api/auth/validate',
      {
        token,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Você pode adaptar a lógica de verificação com base na resposta da sua API
    if (response.status === 200 && response.data?.valid === true) {
      return true;
    } else {
      console.error('Token inválido ou expirado');
      return false;
    }

  } catch (error) {
    console.error('Erro ao verificar token:', error?.response?.data || error.message);
    return false;
  }
}
