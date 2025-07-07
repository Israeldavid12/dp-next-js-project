'use client'
import PayoutMethods from './_components/PayoutMethods'
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { Loading } from '../_components/LoadindAnim'
import { toast } from 'react-toastify';
import CustomToast from '../_components/CustomToast'


function ProfilePage() {
    const [req_response, setRes] = useState(false);
    const [is_change, setChange] = useState(false)
    const [form, setForm] = useState([
        {
            name: null,
            national_id: null,
            contact: null
        }
    ]);
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const token = localStorage.getItem('sessionToken')



    useEffect(() => {
        async function getData() {
            try {
                const req = await axios.get('http://localhost:4000/api/user/personal/data', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (req?.data) {
                    setUser(req?.data?.user)
                    return setLoading(false)
                } else {
                    return setLoading(false)
                }

            } catch (e) {
                toast(<CustomToast message="Algo deu errado ao buscar dados." />);
                return setLoading(false)
            }
        }
        if (token) {
            getData()
        }

    }, [token])

    const handleSaveData = async (req, res) => {
        try {
            setChange(false)
            setRes(null)
            const req = await axios.post('http://localhost:4000/api/user/update-personal', {
                ...form
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (req?.data?.statusCode === 201) {
                setRes(req?.data?.message)
                setChange(true)
            } else {
                setChange(true)
            }

        } catch (e) {
            console.log(e)
            return setChange(true)
        }
    }



    const handleName = (e) => {
        setChange(true)
        setForm({ ...form, name: e.target.value })
        if ((e.target.value).length > 100) {
            e.target.classList.remove('hover:ring-blue-500');
            e.target.classList.add('hover:ring-red-500');
            e.target.value = ''
        }

    }
    const handleId = (e) => {
        setChange(true)
        setForm({ ...form, national_id: e.target.value })
        if ((e.target.value).length > 100) {
            e.target.classList.remove('hover:ring-blue-500');
            e.target.classList.add('hover:ring-red-500');
            e.target.value = ''
        }
    }
    const handleContact = (e) => {
        setChange(true)
        setForm({ ...form, contact: e.target.value })
        if ((e.target.value).length > 100) {
            e.target.classList.remove('hover:ring-blue-500');
            e.target.classList.add('hover:ring-red-500');
            e.target.value = ''
        }
    }


    if (loading) return <Loading />;



    return (
        <div className='grid sm:p-3 gap-4 w-full text-[13px]' >
            <p className='text-[16px]  font-bold' >Minha conta</p>
            <p>
                Informações pessoais  <i className="bi bi-person-circle text-[18px]"></i>
            </p>

            {req_response && (
                <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                    {req_response}
                </div>
            )}

            <div className='grid  gap-8 bg-white p-6 rounded-sm w-full' >

                <div className='grid sm:flex w-full gap-4' >
                    <div className='w-full' >
                        <p className=' w-full' >Nome completo  </p>
                        <input onChange={handleName} className='w-full outline-none ring ring-[silver] text=[14px] px-4 py-2 rounded hover:ring-blue-500' defaultValue={user?.name} type="text" />
                    </div>
                    <div className='w-full' >
                        <p className='text-[13px] w-full' >E-mail  </p>
                        <input className='w-full outline-none ring ring-[silver] text=[14px] px-4 py-2 rounded hover:ring-blue-500 opacity-50' defaultValue={user?.email} placeholder='' type="text" disabled />
                    </div>
                </div>
                <div className='w-full' >
                    <p className='text-[13px]' >National ID (Bilhete de Identidade) </p>
                    <input onChange={handleId} className='w-[100%] outline-none ring ring-[silver] text=[14px] px-4 py-2 rounded hover:ring-blue-500' defaultValue={user?.national_id} placeholder='' type="text" />
                </div>

                <div>
                    <p className='font-bold text-[14px]' >Limite de criação de produtos </p>
                    <p>5</p>
                </div>


            </div>

            <p>
                Telefone <i className="bi bi-telephone-fill"></i>
            </p>

            <div className='grid text=[14px] sm:flex sm:justify-start items-center gap-3 bg-white p-6 rounded-sm w-full' >
                <div className='sm:w-[10%]' >
                    <p>Código do país</p>
                    <select name="contact" id="contact">
                        <option value="+258">+258</option>
                    </select>
                </div>
                <div className='w-full' >
                    <p>
                        Celular
                    </p>
                    <input onChange={handleContact} className='w-full outline-none ring ring-[silver]  px-4 py-2 rounded hover:ring-blue-500' type="number" defaultValue={user?.contact} id="" />
                </div>

            </div>

            {is_change ? (
                <button onClick={handleSaveData} className="flex justify-center gap-2 text-white px-4 py-2 bg-green-600 hover:bg-green-400 rounded-sm w-30">
                    Salvar
                </button>
            )
                :
                (
                    <button className="flex justify-center gap-2 text-white px-4 py-2 bg-green-300 hover:bg-green-700 rounded-sm w-30 opacity-50" disabled>
                        Salvar
                    </button>
                )
            }

            {user && (<PayoutMethods />)}


        </div>
    )
}



export default ProfilePage;