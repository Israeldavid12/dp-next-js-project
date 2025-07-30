'use client'
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import axios from 'axios';

export default function ResetPassword() {
    const [status, setStatus] = useState('');
    const router = useRouter();
    const [isLoading, setLoading] = useState(false)

    const handleResetPassword = async (e) => {
        e.preventDefault();
        const password = e.target.password.value;
        const token = new URLSearchParams(window.location.search).get('token');

        if (!token) {
            setStatus("Token inválido.");
            return;
        }
        try {
            setLoading(true)
            const res = await axios.post('https://auth.droopay.com/api/auth/reset', {
                password,
                token,
            });

            if (res.status === 200) {
                setStatus("Senha redefinida com sucesso!");
                setTimeout(() => router.push("/auth/login"), 2000); 
                setLoading(false)
            } else {
                setStatus("Erro ao redefinir a senha.");
                 setLoading(false)
            }

        } catch (e) {
            setStatus("Erro ao redefinir a senha.");
             setLoading(false)
        }

    };




    return (
        <div className="grid gap-4 w-full justify-center items-center h-[100vh] " >
            <div className="grid gap-4 p-6 border border-gray-300 rounded-xl" >
                <p><strong>Redefinir Senha</strong></p>
                <p>{status}</p>
                <p>Digite sua nova Senha</p>
                <form onSubmit={handleResetPassword} className='grid gap-3'>
                    <input className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                        type="text" placeholder="Digite sua nova senha"
                        name='password'
                        required
                        minLength={6}
                    />
                    <button className={`px-6 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition duration-200 ease-in-out ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        type='submit' disabled={isLoading}
                    >
                        Confirmar
                    </button>
                </form>
                <p className='text-center text-[12px]' > &#x00A9; DROP PAYMENTS - 2025  </p>
            </div>
        </div>
    )
}

