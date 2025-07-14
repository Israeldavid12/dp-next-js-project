"use client";
import styles from '../styles.auth.module.css';
import { useState, useEffect } from 'react';
import axios from 'axios';


export default function RecoverPassword() {
    const [status, setStatus] = useState('');
    const [isValid, setValid] = useState(false)

    const handleReset = async (e) => {
        e.preventDefault()
        const email = e.target.email.value;

        try {
            const res = await axios.post('https://auth.droopay.com/api/auth/request-reset', {
                email,
            });

            if (res.status === 200) {
                setStatus("E-mail enviado! Verifique sua caixa de entrada.");
                setValid(true)
            } else {
                setStatus("Erro ao enviar e-mail");
                setValid(false)
            }
        } catch (error) {
            if (error.response) {
                setStatus("Erro ao enviar e-mail");
                setValid(false)
            } else {
                setStatus("Erro de conexão");
                setValid(false)
            }
        }

    };




    return (
        <>
            <div className="grid justify-center items-center gap-3 h-[100%] w-full p-15" >
                <p><strong>Recuperar minha senha</strong></p>
                <p>Preencha o campo abaixo com seu endereço de e-mail para <br />
                    receber instruções sobre como criar uma nova senha.</p>
                <hr />
                <form action='' onSubmit={handleReset} className='grid gap-3'>
                    <div>
                        <p className={` ${isValid ? 'text-green-500' : 'text-red-500'} `} >{status}</p>
                        <br />
                        <p>Email</p>
                        <input className={styles.emailInput} type="email" placeholder="insira o seu email" required
                        name='email'

                        />
                    </div>
                    <button type='submit' className={styles.authenticator} >Redefinir minha senha</button>
                </form>
                <a href="/auth/login" className={styles.helpBtn}>Voltar</a>
                <p className='text-center text-[12px]' > &#x00A9; DROP PAYMENTS - 2025  </p>
            </div>

        </>
    )
}