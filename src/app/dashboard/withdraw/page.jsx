'use client'
import { useState, useEffect } from "react";
import axios from "axios";
import WithdrawPopUp from './_components/WithdrawModal'
import { Loading } from "../_components/LoadindAnim"
import { Search } from "lucide-react";
const apiUrl = process.env.NEXT_PUBLIC_BASE_API_URL;



const StatusVIew = ({ status }) => {
    console.log(status)
    return (
        <>
            <div className="m-2 w-full self-center" >
                {status === 'pendente' && (

                    <td className="px-2 py-1 m-2 w-full text-[13px] text-center bg-yellow-200 text-yellow-800 rounded-md">
                        {status || 'N/A'}
                    </td>

                )}
                {status === 'revisao' && (
                    <td className="px-2 py-1 m-2  w-full text-[13px] text-center bg-orange-200 text-orange-800 rounded-md">
                        {status || 'N/A'}
                    </td>
                )}
                {status === 'concluido' && (
                    <td className="px-2 py-1 m-2 w-full text-[13px] text-center bg-green-200 text-green-800 rounded-md">
                        {status || 'N/A'}
                    </td>
                )}
            </div>
        </>

    )
}


function Listwithdraw({ withdraw, limit = 10 }) {



    return (
        <div className="grid gap-3" >
            <div className="overflow-x-auto p-2 bg-white" >
                <table className="min-w-full divide-y divide-gray-200 text-sm text-left text-[12px]">
                    <thead className="bg-white ">
                        <tr>
                            <th className="px-4 py-3 text-gray-600 font-semibold ">Valor solicitado:</th>
                            <th className="px-4 py-3 text-gray-600 font-semibold">Valor a receber:</th>
                            <th className="px-4 py-3 text-gray-600 font-semibold">Taxa:</th>
                            <th className="px-4 py-3 text-gray-600 font-semibold">Pagamento</th>
                            <th className="px-4 py-3 text-gray-600 font-semibold">Estado:</th>
                            <th className="px-4 py-3 text-gray-600 font-semibold">ID do saque:</th>
                            <th className="px-4 py-3 text-gray-600 font-semibold">Data</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {[...withdraw].reverse().slice(0, limit).map((withdraw) => (
                            <tr key={withdraw.id} className="hover:bg-gray-50 ">
                                <td className="px-4 py-2">{withdraw.requested_amount || 'N/A'}</td>
                                <td className="px-4 py-2">{withdraw.amount_receive || 'N/A'}</td>
                                <td className="px-4 py-2">{(withdraw.fee).toUpperCase()}</td>
                                <td className="px-4 py-2">{withdraw?.payment_method || 'N/A'}</td>
                                <StatusVIew status={withdraw?.status} />
                                <td className="px-4 py-2">{withdraw?.id || 'N/A'}</td>
                                <td className="px-4 py-2">
                                    {withdraw?.created_at
                                        ? new Date(withdraw.created_at).toLocaleString('pt-PT', {
                                            day: '2-digit',
                                            month: '2-digit',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })
                                        : 'N/A'}
                                </td>

                            </tr>
                        ))}


                    </tbody>
                </table>
            </div>
        </div>
    )
}


function Alert() {
    return (
        <div className="flex items-center p-4 mb-4 text-sm text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800" role="alert">
            <svg className="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span className="sr-only">Info</span>
            <div>
                Faça saques e veja o historico de saques ja feitos
            </div>
        </div>
    )
}


export default function Withdraw() {
    const [withdraw, setWithdraw] = useState([])
    const [balances, setBalance] = useState(null)
    const [is_load, setLoad] = useState(true)
    const [limit, setLimit] = useState(10)
    const [payouts, setPayouts] = useState([])
    const token = localStorage.getItem('sessionToken')

    const handleWithdraw = async () => {
        try {
            const req1 = axios.get(apiUrl + '/api/withdraw/all', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const req2 = axios.get(apiUrl + '/api/user/summary-status', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const req3 = axios.get(apiUrl + '/api/payouts-methods/all', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const [withdraw_response, summary_response, payouts_response] = await Promise.all([
                req1, req2, req3
            ])

            setWithdraw(withdraw_response.data?.withdraw)
            setBalance(summary_response?.data?.balances)
            setPayouts(payouts_response?.data?.payouts)
            // console.log(payouts_response?.data?.payouts)
            setLoad(false)
        } catch (e) {
            setLoad(false)
        }
    }

    useEffect(() => {
        handleWithdraw()
    }, [token])


    if (!balances) return <Loading />
    return (
        <div className="grid sm:gap-4 sm:p-8" >
            <div>
                <p className="text-[19px]"><span className="font-[600]" >Saques</span> <a href="/dashboard"><i className="bi bi-arrow-bar-left"></i> Dashboard</a></p>
                <Alert />

                <div className="flex justify-between bg-white rounded-md p-4" >
                    <div className="a-balance" >
                        <p className="text-[13px]" >Saldo disponivel <span><i className="bi bi-credit-card-2-back-fill"></i>   </span></p>
                        <p className="text-[18px] ml-3" id="w-balance">{(balances?.mpesa_emola || '0.00' + ' MT') || '0.00 MT'}</p>
                    </div>
                    <WithdrawPopUp balances={balances} payouts_wallets={payouts} />

                </div>

                <div className="mt-8" >
                    <p>Últimas 10 entradas.</p>
                    <div className="flex gap-3 justify-center items-center rounded-md p-2 bg-white" >
                        <p className="text-[13px]" > Saques:</p>
                        <input
                            onChange={(e) => setLimit(e.target.value)}
                            type="number" min={0} placeholder="10"
                            className="w-full text-sm focus:outline-none outline-none p-2 focus:ring-1 focus:ring-blue-500  border-[silver] border-1 rounded-md"
                        />
                        <button
                            // onClick={(e) => setLimit(e.target.value)}
                            type="button" className=" w-full max-w-30 text-black bg-white
                              ring-1 ring-gray-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2.5 me-2 mb-2 focus:outline-none dark:focus:ring-blue-800 text-[12px]">Aplicar filtros</button>
                    </div>

                </div>



            </div>
            {withdraw && withdraw.length !== 0 ? (
                <Listwithdraw limit={limit} withdraw={withdraw} />
            )
                :
                (
                    <div className="flex flex-col items-center py-12 px-6">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                            <Search className="w-6 h-6 text-blue-600" />
                        </div>

                        <p className="text-lg font-semibold text-gray-700 mb-2">
                            Nenhum saque encontrado
                        </p>

                        <p className="text-sm text-gray-500 text-center">
                            Tente ajustar os filtros de pesquisa
                        </p>
                    </div>
                )
            }
        </div>
    );
}