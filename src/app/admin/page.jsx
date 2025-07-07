'use client'
import axios from 'axios'
import useRoles from '../hooks/useRoles'
import React, { useEffect, useState } from 'react'
import { useLoading } from '../../../src/contexts/LoadingContext'

export default function adminPage() {
    const { setIsLoading } = useLoading();
    const roles = useRoles()
    const token = localStorage.getItem('sessionToken')
    const [top_10_sales, setTop_10_Sales] = useState(null)
    const [insights, setData] = useState(null)

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const result = await axios.get(`http://localhost:4000/api/admin/overview`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setTop_10_Sales(result?.data?.latest_sales)
                setData(result?.data)
                setIsLoading(false);
            } catch (e) {
                setIsLoading(false);
            } finally {
                setIsLoading(false);
            }
        })()
    }, []);





    if (!roles || !token) {
        return (
            <div className='flex justify-center items-center h-screen' >
                <p className='text-[20px] font-bold text-[#062757]' >Acesso negado, por favor faça login</p>
            </div>
        )
    }

    if (roles?.level !== 'superadmin') {
        return (
            <div className='flex justify-center items-center h-screen' >
                <p className='text-[20px] font-bold text-[#062757]' >Acesso negado, apenas super administradores podem acessar esta pagina</p>
            </div>
        )
    }








    return (
        <div>
            <p className='text-[20px] font-bold' >Visão geral</p>

            <div className='bg-white w-29 flex justify-center items-center p-2 gap-1 text-[14px]  rounded-md cursor-pointer' >
                <i class="bi bi-calendar"></i>
                <p> Periodo </p>
                <i class="bi bi-caret-down-fill"></i>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5 ' >
                <div className='bg-white p-5 rounded-md' >
                    <p className='text-[#001737] text-[13px]' >Vendas</p>
                    <p className='font-[700] text-[20px] text-green-600' >{insights?.revenue?.total_revenue} MT</p>
                    <p className='text-green-600 ' ><i class="bi bi-caret-up-fill"></i></p>
                </div>
                <div className='bg-white p-5 rounded-md' >
                    <p className='text-[#001737] text-[13px]' >Total de transacoes (Vendas)</p>
                    <p className='font-[700] text-[20px]' >{insights?.revenue?.total_sales}</p>
                    <p className='text-green-600 ' ><i class="bi bi-caret-up-fill"></i></p>
                </div>

                <div className='bg-white p-5 rounded-md' >
                    <p className='text-[#001737] text-[13px]' >Total de usuarios</p>
                    <p className='font-[700] text-[20px]' >{insights?.users?.total_users}</p> 
                    <p className='text-green-600 ' ><i class="bi bi-caret-up-fill"></i></p>
                </div>

                <div className='bg-white p-5 rounded-md' >
                    <p className='text-[#001737] text-[13px]' >Receita mensal</p>
                    <p className='font-[700] text-[20px]' >{insights?.current_month_revenue?.total_revenue} MT</p>
                    <p className='text-green-600 ' ><i class="bi bi-caret-up-fill"></i></p>
                </div>
            </div>

            <div className='grid bg-white mt-5 p-5 rounded-sm' >

                <p>Últimas 10 vendas realizadas na plataforma</p>

                <table className='w-full mt-5' >
                    <thead>
                        <tr className='border-b-1 border-gray-300' >
                            <th className='text-left p-2'>ID</th>
                            <th className='text-left p-2'>Cliente</th>
                            <th className='text-left p-2'>Valor</th>
                            <th className='text-left p-2'>Nome do item</th>
                             <th className='text-left p-2'>Ambiente</th>
                            <th className='text-left p-2'>Data</th>
                        </tr>
                    </thead>
                    <tbody className='text-[14px]' >
                        {top_10_sales?.map((sale, index) => (
                            <tr key={index} className='border-b border-gray-200' >
                                <td className='p-2'>{sale.id}</td>
                                <td className='p-2'>{sale.customer_name}</td>
                                <td className='p-2 text-green-600 font-bold'>{sale.amount} MT</td>
                                <td className='p-2'>{sale.item_name}</td>
                                <td className='p-2'>{sale.environment === 'live' ? (<p className='bg-orange-500 text-center text-white' >Produção</p>) : (<p>Teste</p>)}</td>
                                <td className='p-2'>{new Date(sale.date).toLocaleDateString()}</td>
                            </tr>
                        ))}


                    </tbody>
                </table>

            </div>

        </div>
    )
}