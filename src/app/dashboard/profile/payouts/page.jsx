'use client'
import mpesaicon from '../../../../../public/images/mpesa.png'
import emolaicon from '../../../../../public/images/emola.png'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from "next/navigation";
import axios from 'axios'
import useUserId from '../../../hooks/useUserId'




export default function Payout() {
    const [type, setType] = useState(null)
    const searchParams = useSearchParams()
    const holder = searchParams.get('holder')
    const acc_id = searchParams.get('acc_id')
    const methodId = searchParams.get('methodId')
    const [count, setCount] = useState(null)
    const method_type = searchParams.get('type')
    const [response, setResponse] = useState(null)
    const [account_holder, setHolder] = useState(null)
    const [account_id, setAccId] = useState(null)
    const isFirstRender = useRef(true);
    const userId = useUserId()


    useEffect(() => {
        if (method_type && method_type.toLowerCase() === 'mpesa') {
            setType('Mpesa')
        }
        if (method_type && method_type.toLowerCase() === 'emola') {
            setType('eMola')
        }

    }, [])


    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        async function handlePayoutsRequest() {
            try {
                const payload = {
                    reqType: 'upadate/create/payoutmethos',
                    data: {
                        type: method_type ? 'update' : 'create',
                        userId: userId,
                        method_type: type,
                        account_holder: account_holder,
                        account_id: account_id,
                        methodId: methodId,
                    }
                }
                const req = await axios.post('https://monsterbot.vercel.app/api/user', payload)
                console.log(req?.data)
                if (req?.data) {
                    setResponse(req?.data?.message)
                }

            } catch (e) {
                console.log(e)
                // setResponse(e.message)
            }
        }
        handlePayoutsRequest()

    }, [count])




    return (
        <div className="grid sm:flex sm:p-8 p-4 " >
            <div className="grid  gap-6 bg-white rounded-md w-full p-9" >
                <div>
                    <p className="font-bold text-[18px] text-[#000] " >Métodos de pagamentos</p>
                    <br />
                    {response && (
                        <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                            {response}
                        </div>
                    )}
                    <p className="text-[11px] text-[#292929]  " >Atualize ou adicione um novo metodo de pgamentp <br />
                        NB: Você pode adicionar até 3 formas de pagamento à sua conta.</p>
                </div>

                <div className='flex  gap-4 p-2' >
                    <Image alt='image' onClick={() => setType('Mpesa')} className={`w-15 h-15 rounded-md
                        ${type === "Mpesa" ? " ring-2 ring-blue-300 opacity-60 " : ""}`} src={mpesaicon} />


                    <Image onClick={() => setType('eMola')} className={`w-15 h-15 rounded-md 
                         ${type === "eMola" ? " ring-2 ring-blue-300 opacity-60 " : ""}`} src={emolaicon} />
                    {/* <Image className='w-15 h-15 rounded-md'  src={mpesaicon}  /> */}
                </div>

                {type === 'Mpesa' && (
                    <>

                        <div className='sm:flex grid justify-between w-full gap-6 ' >
                            <div className='w-full' >
                                <p>Numero Mpesa *</p>
                                <input onChange={(e) => setAccId(e.target.value)} id='account_id' defaultValue={acc_id || ''} className='outline-none text-md px-2 py-2 rounded-md ring-1 ring-[silver] 
             hover:ring-blue-500 w-full' type="number" />
                            </div>
                            <div className='w-full' >
                                <p>Nome do Titular *</p>
                                <input onChange={(e) => setHolder(e.target.value)} id='holder' defaultValue={holder || ''} className='outline-none text-md px-2 py-2 rounded-md ring-1 ring-[silver] 
             hover:ring-blue-500 w-full' type="text" />
                            </div>

                        </div>
                        <p className="text-[11px] text-[silver[ " >Ao salvar essas informacoes garante que as mesmas sao verdairas e tem o total resposabilizacao em caso de houver alguma incoformidade entre os dados.</p>
                        {account_holder && account_id ? (
                            <button onClick={() => setCount(count + 1)} className='text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-xs px-5 py-4 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800 sm:w-100' >
                                Salvar Informações
                            </button>
                        )
                            :
                            (
                                <button className='text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-xs px-5 py-4 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800 sm:w-100 opacity-70' disabled>
                                    Salvar Informações
                                </button>
                            )
                        }


                    </>

                )
                }
                {type === 'eMola' && (
                    <>

                        <div className='sm:flex grid justify-between w-full gap-6 ' >
                            <div className='w-full' >
                                <p>Numero eMola *</p>
                                <input onChange={(e) => setAccId(e.target.value)} id='account_id' defaultValue={acc_id || ''} className='outline-none text-md px-2 py-2 rounded-md ring-1 ring-[silver] 
            hover:ring-blue-500 w-full' type="number" />
                            </div>
                            <div className='w-full' >
                                <p>Nome do Titular *</p>
                                <input onChange={(e) => setHolder(e.target.value)} id='holder' defaultValue={holder || ''} className='outline-none text-md px-2 py-2 rounded-md ring-1 ring-[silver] 
            hover:ring-blue-500 w-full' type="text" />
                            </div>

                        </div>
                        <p className="text-[11px] text-[silver[ " >Ao salvar essas informacoes garante que as mesmas sao verdairas e tem o total resposabilizacao em caso de houver alguma incoformidade entre os dados.</p>
                        {account_holder && account_id ? (
                            <button onClick={() => setCount(count + 1)} className='text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-xs px-5 py-4 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800 sm:w-100' >
                                Salvar Informações
                            </button>
                        )
                            :
                            (
                                <button className='text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-xs px-5 py-4 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800 sm:w-100 opacity-70' disabled>
                                    Salvar Informações
                                </button>
                            )
                        }

                    </>
                )}




            </div>
        </div>
    )
}