'use client'
import PayoutMethods from './_components/PayoutMethods'
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { Loading } from '../_components/LoadindAnim'
import { toast } from 'react-toastify';
import CustomToast from '../_components/CustomToast'
const apiUrl = process.env.NEXT_PUBLIC_BASE_API_URL;


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
                const req = await axios.get(apiUrl + '/api/user/personal/data', {
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

    const handleSaveData = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            setChange(false)
            setRes(null)
            const req = await axios.post(apiUrl + '/api/user/update-personal', {
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
        setForm([{ ...form[0], name: e.target.value }])
        if ((e.target.value).length > 100) {
            e.target.classList.remove('hover:ring-blue-500');
            e.target.classList.add('hover:ring-red-500');
            e.target.value = ''
        }

    }
    const handleId = (e) => {
        setChange(true)
        setForm([{ ...form[0], national_id: e.target.value }])
        if ((e.target.value).length > 100) {
            e.target.classList.remove('hover:ring-blue-500');
            e.target.classList.add('hover:ring-red-500');
            e.target.value = ''
        }
    }
    const handleContact = (e) => {
        setChange(true)
        setForm([{ ...form[0], contact: e.target.value }])
        if ((e.target.value).length > 100) {
            e.target.classList.remove('hover:ring-blue-500');
            e.target.classList.add('hover:ring-red-500');
            e.target.value = ''
        }
    }


    if (loading) return <Loading />;


    return (
        <div className="min-h-screen  dark:bg-gray-900">
            <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
                <div className="space-y-6">
                    {/* Header */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                            <i className="bi bi-person-circle me-3 text-[#252F3F]"></i>
                            Minha Conta
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Gerencie suas informações pessoais e configurações
                        </p>
                    </div>

                    {/* Success Message */}
                    {req_response && (
                        <div className="p-4 text-sm text-green-800 rounded-xl bg-green-50 border border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800">
                            <div className="flex items-center gap-2">
                                <i className="bi bi-check-circle-fill"></i>
                                <span>{req_response}</span>
                            </div>
                        </div>
                    )}

                    {/* Personal Information */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-[#252F3F] rounded-full flex items-center justify-center">
                                <i className="bi bi-person text-white"></i>
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                                    Informações Pessoais
                                </h2>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Atualize seus dados pessoais
                                </p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Nome Completo
                                    </label>
                                    <input
                                        onChange={handleName}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#252F3F] focus:border-[#252F3F] transition-colors duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        defaultValue={user?.name}
                                        type="text"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        E-mail
                                    </label>
                                    <input
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-600 dark:border-gray-600 dark:text-gray-400"
                                        defaultValue={user?.email}
                                        type="email"
                                        disabled
                                    />
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        O e-mail não pode ser alterado
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Bilhete de Identidade
                                </label>
                                <input
                                    onChange={handleId}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#252F3F] focus:border-[#252F3F] transition-colors duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    defaultValue={user?.national_id}
                                    type="text"
                                />
                            </div>

                            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                                <div className="flex items-center gap-3">
                                    <i className="bi bi-info-circle text-blue-600 dark:text-blue-400"></i>
                                    <div>
                                        <p className="font-medium text-blue-800 dark:text-blue-400">
                                            Limite de Criação de Produtos
                                        </p>
                                        <p className="text-blue-700 dark:text-blue-300 text-sm">
                                            Você pode criar até <strong>5 produtos</strong> na sua conta
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Phone Information */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-[#252F3F] rounded-full flex items-center justify-center">
                                <i className="bi bi-telephone text-white"></i>
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                                    Contacto
                                </h2>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Informações de contacto
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Código do País
                                </label>
                                <select
                                    name="contact"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#252F3F] focus:border-[#252F3F] transition-colors duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                >
                                    <option value="+258">🇲🇿 +258</option>
                                </select>
                            </div>
                            <div className="md:col-span-3 space-y-2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Número de Celular
                                </label>
                                <input
                                    onChange={handleContact}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#252F3F] focus:border-[#252F3F] transition-colors duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    type="tel"
                                    defaultValue={user?.contact}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-end">
                        {is_change ? (
                            <button
                                onClick={handleSaveData}
                                className="flex items-center gap-2 px-6 py-3 bg-[#252F3F] text-white font-medium rounded-lg hover:bg-[#1a2332] focus:outline-none focus:ring-2 focus:ring-[#252F3F] focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl"
                            >
                                <i className="bi bi-check-circle"></i>
                                Salvar Alterações
                            </button>
                        ) : (
                            <button
                                className="flex items-center gap-2 px-6 py-3 bg-gray-300 text-gray-500 font-medium rounded-lg cursor-not-allowed opacity-50"
                                disabled
                            >
                                <i className="bi bi-check-circle"></i>
                                Salvar Alterações
                            </button>
                        )}
                    </div>

                    {/* Payment Methods */}
                    {user && <PayoutMethods />}
                </div>
            </div>
        </div>
    );

}



export default ProfilePage;