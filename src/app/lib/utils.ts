export const getUserEmail = (data) => {
    return data?.user?.email
  };



export function togglePassword() {
  const input = document.getElementById('password') as HTMLInputElement | null;
  if (input) {
    input.type = input.type === 'password' ? 'text' : 'password';
  }
}

