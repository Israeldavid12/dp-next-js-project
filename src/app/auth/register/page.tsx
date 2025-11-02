'use client';
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import styles from '../styles.auth.module.css';
import PlataformInfo from './_components/PlataformInfoContainer'
import GoolgeAuth from './_components/GoogleAuth'
import axios from 'axios';
import { togglePassword } from '../../lib/utils'
import Spinner from '../login/_components/Spinner'


export default function Register() {
  const [error, setError] = useState(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault()
    const form = new FormData(e.target);

    const formData = {
      name: form.get('name'),
      email: form.get('email'),
      password: form.get('password')
    }

    try {
      setIsLoading(true)
      const req = await axios.post('https://auth.droopay.com/api/auth/signup', {
        formData: {
          ...formData
        }
      });

       const is_pending = req.data.is_pending;

      if (is_pending) {
        router.push('/auth/account_pending');
        return;
      }


      console.log(req.data)
      setError(req.data.message)
      if (req.data.token) {
        localStorage.setItem('sessionToken', req.data.token)
        router.push('/dashboard');
        setIsLoading(false)
      } else {
        setError('Usuario não encontrado')
        console.error('Token inválido ou ausente');
        setIsLoading(false)
        return
      }


    } catch (error) {
      console.log(error)
      if (error.response.data.error) {
        setError(error.response.data.error)
        setIsLoading(false)
      }
      else if (error.response.data.message) {
        setError(error.response.data.message)
        setIsLoading(false)
      } else {
        setError(error.message)
        setIsLoading(false)
      }


    }

  }






  return (
    <div className='grid sm:flex gap-10 h-[100vh] w-full '>
      <PlataformInfo />

      <div className={styles.authContainer}>
        <p className="font-[700] text-[20px]">Criar nova conta</p>
        <p>Crie uma conta conta, para começar a usar os nossos serviços.</p>

        <GoolgeAuth />

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <form className="form grid gap-4 w-[100%] sm:min-w-[390px]" onSubmit={handleRegister}>
          {/* <p className='text-red-600'>{error} ggggggggg </p> */}
          <div className='w-full' >
            <p>Nome</p>
            <input
              placeholder="Insira o seu nome completo"
              className={styles.emailInput}
              type="text"
              id="name"
              name='name'
              maxLength={100}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className='w-full' >
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
            <div className='flex gap-3 mt-2 mb-2' >
              <input type="checkbox" className="checkbox checked:border-green-500 checked:bg-green-500 checked:text-white" id="my-checkbox" required />
              <label htmlFor="my-checkbox">Aceito os termos e condicoes</label>
            </div>
            <div className="flex gap-4 mt-1">
              <p>Esqueceu sua senha?</p>
              <a className="underline underline-offset-1" href="/auth/recover/">
                Clique aqui
              </a>
            </div>
          </div>
          <button id="authenticator" type="submit" className={`${styles.authenticator} flex justify-center items-center`}>
            {isLoading ? (<Spinner />) : (<p> Criar conta </p>)}
          </button>
        </form>

        <div>
          <div className="flex gap-4">
            <p>Já tem uma conta?</p>
            <a className="underline underline-offset-1" href="/auth/login/">
              Inciar sessao
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
