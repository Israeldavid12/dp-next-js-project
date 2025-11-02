"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { togglePassword } from '../../lib/utils'
import styles from '../styles.auth.module.css';
import Image from 'next/image';
import logo from '../../../../public/images/logo.png';
import loginIcon from '../../../../public/images/login-iart.png';
import googleIcon from '../../../../public/images/goolge-icon.png';
import axios from 'axios';
import Spinner from './_components/Spinner'


export default function Login() {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const router = useRouter()


  const handleLogin = async (e) => {
    e.preventDefault()

    const form = new FormData(e.target)
    const email = form.get('email')
    const password = form.get('password')

    try {
      setIsLoading(true)
      const req = await axios.post('https://auth.droopay.com/api/auth/signin', {
        email,
        password
      });
      const token = req.data.token;
      const is_pending = req.data.is_pending;

      if (is_pending) {
        router.push('/auth/account_pending');
        return;
      }

      if (token) {
        localStorage.setItem('sessionToken', token)
        router.push('/dashboard');
        setTimeout(() => {
          setIsLoading(false)
        }, 3000);
      }

    } catch (err) {
     
      if (err.response) {
        setIsLoading(false)
        setError(err.response.data.message)
      } else {
        setIsLoading(false)
        setError(err.message)
      }

    }


  }




  return (
    <div className={styles.mainContainer}>
      <div className={styles.plataformInfoContainer}>
        <div className="grid gap-4">
          <Image className="w-20 rounded-full" src={logo} alt="Logo" />
          <p className="text-[22px] font-[800] text-[#ffffff]">
            Com o que você sabe, é possível criar um negócio online de sucesso.
            <br /> Estamos aqui para ajudar você a começar.
          </p>
          <span className="text-[16px] font-[500] text-[#ffffff]">
            Nós ajudaremos você a dar o próximo passo. Faça login ou crie uma conta.
          </span>
          <Image className={styles.loginIcon} src={loginIcon} alt="Login Icon" />
        </div>
      </div>

      <div className={styles.authContainer}>
        <div>
          <p className="font-[700] text-[20px]">AUTENTICAR</p>
          <p>Inicie uma sessão inserindo suas informações abaixo.</p>
        </div>

        <div className={styles.googleAuth} id="google-auth">
          <Image src={googleIcon} alt="Google" />
        </div>

        <hr className='text-[silver]' />
        {error && <p className="text-red-500 mb-2">{error}</p>}

        <form className="form grid gap-8" onSubmit={handleLogin}>
          <div>
            <p>Email</p>
            <input
              placeholder="Insira o seu email"
              className={styles.emailInput}
              type="email"
              id="email"
              name='email'
              maxLength={100}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <p>Palavra-passe</p>
            <div className={styles.passwordInput}>
              <input
                placeholder="Insira sua palavra-passe"
                type="password"
                id="password"
                name='password'
                maxLength={100}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <i onClick={() => togglePassword()} className="bi bi-eye "></i>
            </div>
            <div className="flex gap-4 mt-1">
              <p>Esqueceu sua senha?</p>
              <a className="underline underline-offset-1" href="/auth/recover/">
                Clique aqui
              </a>
            </div>
          </div>
          <button id="authenticator" type="submit" className={`${styles.authenticator} flex justify-center items-center`}>
            {isLoading ? (<Spinner />) : (<p>Entrar</p>)}
          </button>
        </form>

        <div>
          <div className="flex gap-4">
            <p>Não tem uma conta?</p>
            <a className="underline underline-offset-1" href="/auth/register/">
              Criar conta
            </a>
          </div>
        </div>

        <div className={styles.helpBtn}>
          <i className="bi bi-question-circle"></i>
          <p>Ajuda</p>
        </div>
      </div>
    </div>
  );

}
