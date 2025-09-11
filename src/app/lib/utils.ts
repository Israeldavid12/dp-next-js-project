import axios from "axios";

export const getUserEmail = (data) => {
  return data?.user?.email
};



export function togglePassword() {
  const input = document.getElementById('password') as HTMLInputElement | null;
  if (input) {
    input.type = input.type === 'password' ? 'text' : 'password';
  }
}


export async function checkActivation(type: string) {

  if (type === "global") {
    const item = localStorage.getItem("is_first_show_activation");

    // Se nunca foi salvo nada, significa que é o primeiro login
    if (!item) {
      // Marca que já passou pela primeira vez
      localStorage.setItem("is_first_show_activation", "true");
      return; // Não executa verificação
    }
  }


  // Se já tem o item, significa que é a segunda vez em diante
  try {
    const token = localStorage.getItem("sessionToken");
    const request = await axios.post("https://api.droopay.com/api/user/verify-activation", {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (request.data.status) {
      return true;
    } else {
      window.location.href = "/active_account";
    }
  } catch (error) {
    return error;
  }
}

