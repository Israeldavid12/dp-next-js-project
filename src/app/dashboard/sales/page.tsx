'use client'
import axios from "axios"
import { useEffect, useState } from "react"
import { Loading } from "../_components/LoadindAnim"
import { ShoppingCart } from "lucide-react"
import ListSales from './_components/ListSales'
const apiUrl = process.env.NEXT_PUBLIC_BASE_API_URL;







export default function SalesPage() {
    const [sales, setSales] = useState([])
    const [is_load, setLoad] = useState(true)
    const [balance, setBalance] = useState(null)
    const [salesCount, setSalesCount] = useState(0)
    const [query_time, setQueryTime] = useState('all')
    const token = localStorage.getItem('sessionToken')
    const [isActiveServer, setIsActiveServer] = useState(true)

    useEffect(() => {

        const fechData = async () => {

            try {
                setLoad(true)
                const summaryReq = axios.get(apiUrl + "/api/user/summary-status", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const salesReq = axios.get(apiUrl + '/api/user/sales', {
                    params: {
                        query_time: query_time
                    },
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const [summaryRes, salesRes] = await Promise.all([
                    summaryReq,
                    salesReq
                ]);

                setSales(salesRes?.data?.sales)
                setBalance(summaryRes?.data?.balances?.mpesa_emola)
                setSalesCount(summaryRes?.data?.balances?.total_sales || 0)
                setLoad(false)
            } catch (e) {
                if (e.code === 'ERR_NETWORK') {
                    setIsActiveServer(false)
                }
                setLoad(false)
            }
        }

        fechData()


    }, [query_time, token])


    if (!isActiveServer) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
                <h1 className="text-2xl font-bold text-red-600 mb-4">Servidor OFFLINE</h1>
                <p className="text-gray-700 mb-6">Erro de rede: servidor OFFLINE ou inacessível. Tente novamente mais tarde.</p>
                <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                >
                    Tentar Novamente
                </button>
            </div>
        )
    }

    if (is_load) return <Loading />;
    return (
        <div className="grid gap-4 sm:p-8" >
            <div>
                <p className="text-[19px]"><span className="font-[600]" >Vendas</span> <a href="/dashboard"><i className="bi bi-arrow-bar-left"></i> Dashboard</a></p>
                <p className="text-[13px]">Confira o histórico de transações e administre suas vendas com facilidade.</p>
            </div>
            <div className=" grid  md:flex gap-4 ">
                <div className="bg-white grid gap-2 rounded-md p-5 w-full text-[12px] ">
                    <p>Total de vendas realizadas <i className="bi bi-info-circle-fill"></i></p>
                    <span id="sales-lenght" className="text-[23px] font-bold " >{salesCount || 0}</span>
                </div>
                <div className="bg-white grid -gap-2 rounded-md p-5 w-full text-[12px] ">
                    <p>Valor líquido <i className="bi bi-info-circle-fill"></i></p>
                    <span id="sales-made" className="text-[23px] text-green-700" >{balance + ' MT'}</span>
                </div>
            </div>

            {sales && sales.length !== 0 ? (
                <ListSales sales={sales} setQueryTime={setQueryTime} query_time={query_time} />
            )
                :
                (
                    <div className="flex flex-col items-center py-12 px-6">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                            <ShoppingCart className="w-6 h-6 text-green-600" />
                        </div>

                        <p className="text-lg font-semibold text-gray-700 mb-2">
                            Nenhuma venda encontrada
                        </p>

                        <p className="text-sm text-gray-500 text-center">
                            Tente ajustar os filtros ou período de pesquisa
                        </p>
                    </div>
                )
            }


        </div>
    )
}