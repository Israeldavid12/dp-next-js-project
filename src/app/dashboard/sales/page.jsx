'use client'
import axios from "axios"
import { useEffect, useState } from "react"
import { Loading } from "../_components/LoadindAnim"
import mpesa from '../../../../public/images/mpesa.png'
import Image from "next/image"
import { ShoppingCart } from "lucide-react"
const apiUrl = process.env.NEXT_PUBLIC_BASE_API_URL;



const renderMethodIcon = (method) => {
    switch (method) {
        case 'mpesa':
            return <Image src={mpesa} alt="mpesa" className="rounded-lg h-8 w-8" />
            break;

        default:
            return <Image src={mpesa} alt="mpesa" className="rounded-lg h-8 w-8" />
            break;
    }
}


function ListSales({ sales }) {
    const [res_limit, setResLimit] = useState(10)
    const [limit, setLimit] = useState(0)

    return (
        <div className="grid gap-3" >
            <p>Últimas 10 entradas.</p>
            <div className="flex gap-3 justify-center items-center rounded-md p-2 bg-white" >
                <p className="text-[13px]" >Registros:</p>
                <input
                    onChange={(e) => setLimit(e.target.value)}
                    type="number" min={0} placeholder="10"
                    className="w-full text-sm focus:outline-none outline-none p-2 focus:ring-1 focus:ring-blue-500  border-[silver] border-1 rounded-md"
                />
                <button
                    type="button" onClick={() => setResLimit(limit)} className=" w-full max-w-30 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 text-[12px]">Aplicar filtros</button>
            </div>

            {/* //LIST SALES */}
            <div className="overflow-x-auto bg-white p-2" >
                <table className="min-w-full divide-y divide-gray-200 text-sm text-left text-[14px]">
                    <thead className="bg-white ">
                        <tr>
                            <th className="px-4 py-3 text-gray-600 font-semibold ">Nome do produto</th>
                            <th className="px-4 py-3 text-gray-600 font-semibold">Montante</th>
                            <th className="px-4 py-3 text-gray-600 font-semibold">ID da transacao</th>
                            <th className="px-4 py-3 text-gray-600 font-semibold">Pagamento</th>
                            <th className="px-4 py-3 text-gray-600 font-semibold">Comprador/Email</th>
                            <th className="px-4 py-3 text-gray-600 font-semibold">Comprador/Nome</th>
                            <th className="px-4 py-3 text-gray-600 font-semibold">Comprador/Celular</th>
                            <th className="px-4 py-3 text-gray-600 font-semibold">Pais</th>
                            <th className="px-4 py-3 text-gray-600 font-semibold">Data</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {[...sales].reverse().slice(0, res_limit).map((sale) => (
                            <tr key={sale.sale_id} className="hover:bg-gray-50">
                                <td className="px-4 py-2">{sale.product_name || 'N/A'}</td>
                                <td className="px-4 py-2">{sale.amount_paid || 'N/A'}</td>
                                <td className="px-4 py-2">{sale.sale_id || 'N/A'}</td>
                                <td className="px-4 py-2">
                                    {renderMethodIcon(sale.payment_method)}
                                </td>
                                <td className="px-4 py-2">{sale.buyer_email || 'N/A'}</td>
                                <td className="px-4 py-2">{sale.buyer_name || 'N/A'}</td>
                                <td className="px-4 py-2">{sale.buyer_phone || 'N/A'}</td>
                                <td className="px-4 py-2">{sale.buyer_country || 'N/A'}</td>
                                <td className="px-4 py-2">{(sale.created_at).split('T')[0] || 'N/A'}</td>

                            </tr>
                        ))}


                    </tbody>
                </table>
            </div>
        </div>
    )
}



export default function SalesPage() {
    const [sales, setSales] = useState([])
    const [is_load, setLoad] = useState(true)
    const [balance, setBalance] = useState(null)
    const token = localStorage.getItem('sessionToken')

    useEffect(() => {

        const fechData = async () => {

            try {
                const summaryReq = axios.get(apiUrl + "/api/user/summary-status", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const salesReq = axios.get(apiUrl + "/api/user/sales", {
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
                setLoad(false)
            } catch (e) {
                console.log(e)
                setLoad(false)
            }
        }

        fechData()


    }, [])

    if (!balance) return <Loading />;
    return (
        <div className="grid gap-4 sm:p-8" >
            <div>
                <p className="text-[19px]"><span className="font-[600]" >Vendas</span> <a href="/dashboard"><i class="bi bi-arrow-bar-left"></i> Dashboard</a></p>
                <p className="text-[13px]">Confira o histórico de transações e administre suas vendas com facilidade.</p>
            </div>
            <div className=" grid  md:flex gap-4 ">
                <div className="bg-white grid gap-2 rounded-md p-5 w-full text-[12px] shadow">
                    <p>Total de vendas realizadas <i class="bi bi-info-circle-fill"></i></p>
                    <span id="sales-lenght" className="text-[23px]" >{sales?.length || 0}</span>
                </div>
                <div className="bg-white grid -gap-2 rounded-md p-5 w-full text-[12px] shadow">
                    <p>Valor líquido <i class="bi bi-info-circle-fill"></i></p>
                    <span id="sales-made" className="text-[23px]" >{balance + ' MT'}</span>
                </div>
            </div>

            {sales && sales.length !== 0 ? (
                <ListSales sales={sales} />
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