'use client'
import { useState, useEffect } from 'react';
import LoadingButton from '../../_components/Buttons'
import axios from 'axios';
import { redirect } from 'next/navigation'
import { createSupabaseBrowserClient } from '../../../lib/supabase-browser';

export default function OtpConfirm() {
    const [otp, setOtp] = useState('0');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userData, setUserData] = useState('')
    const [error, setError] = useState('')
    const supabase = createSupabaseBrowserClient;

    useEffect(() => {
        const data = JSON.parse(sessionStorage.getItem('userData'));
        if (data) {
            setUserData(data)
            setEmail(data.email); // Armazena o email no estado
            setPassword(data.password)
            console.log(email, password)
        }
    }, []); 

    async function sendOtp() {
        try {
            const res = await axios.post("https://drop-payments.vercel.app/api/v2/live/server", {
                reqType: 'otp/code',
                email: email,
            });

            if (res.data.code === '0') {
                console.log(res.data)
                setError('OTP enviado com successo')
                return true
            } else {
                setError('Erro ao enviar OTP')
                return false
            }
        } catch (error) {
            console.log(error)
            return
        }

    }
    const getuserId = async () => {
        const { data, error } = await supabase.auth.getUser();
        if (data) {
            console.log(data.user.id)

            const res = await axios.post('http://localhost:3030/api/auth', {
                reqType: 'create/user',
                userData: userData,
                userId: data.user.id
            });
            console.log(res.data.code)

            if (res.data.code === 201) {
                console.log(res.data.code)
                redirect('/dashboard/')
            } else {
                console.log('status code invalido')
            }

        } else if (error) {
            console.log('falha ao obter o id')
            setError(error.message)
            return
        }
    }


    async function handleOtp() {
        console.log(otp)
        try {
            const res = await axios.post('https://drop-payments.vercel.app/api/v2/live/server', {
                reqType: 'verifyOtp',
                otp: otp,
                email: email
            });
            if (res.data) {
                try {
                    const { data, error } = await supabase.auth.signUp({
                        email,
                        password,
                    });
                    if (error) {
                        setError(error.message);
                    } else if (data) {
                        console.log('Signup successful', data);
                        getuserId()
                    }
                } catch (err) {
                    setError('An unexpected error occurred.');
                }
            } else {
                return false
            }

        } catch (error) {
            console.log(error)
        }


    }




    return (
        <div className="w-full h-[100vh] grid justify-center items-start " >
            <div className="mt-15 grid gap-3">
                <p>Confirme o codigo OTP <br /> enviado para <strong>{email}</strong></p>
                <p className='text-[20px' >{error}</p>
                <input onChange={(e) => setOtp(e.target.value)}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-300 hover:border-blue-400 transition"
                    type="text" placeholder="Introduza o codigo aqui" />

                <LoadingButton onClick={handleOtp} textButtton='Enviar' />
                <button onClick={sendOtp} >Reenviar OTP</button>
            </div>
        </div>
    )
}