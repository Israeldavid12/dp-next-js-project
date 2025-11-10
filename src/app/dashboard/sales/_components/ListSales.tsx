"use client"
import { useState, useEffect } from "react"
import mpesa from '../../../../../public/images/mpesa.png'
import emola from '../../../../../public/images/emola.png'
import Image from "next/image"
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Ellipsis } from "lucide-react";



const renderMethodIcon = (method: any) => {
    switch (method) {
        case 'mpesa':
            return <Image src={mpesa} alt="mpesa" className="rounded-lg h-8 w-8" />
            break;
        case 'emola': 
        return <Image src={emola} alt="emola" className="rounded-lg h-8 w-8" />
        break;
        default:
            return <Image src={mpesa} alt="mpesa" className="rounded-lg h-8 w-8" />
            break;
    }
}

const renderStatusColor = (status: any) => {
    switch (status) {
        case 'completed':
            return (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                    Concluído
                </span>
            );
        case 'pending':
            return (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
                    Pendente
                </span>
            );
        case 'failed':
            return (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
                    Falhou
                </span>
            );
        default:
            return (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
                    Desconhecido
                </span>
            );
    }
};


function safeJSONParse(data) {
    try {
        return JSON.parse(data);
    } catch {
        return 'N/A';
    }
}


const TransactionDetails = ({ transaction }) => {
    const [count, setCount] = useState(0)
    const response = safeJSONParse(transaction?.response_data)


    return (
        <div>
            <Dialog>
                <form>
                    <DialogTrigger asChild>
                        <Ellipsis width={20} />
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                            <DialogTitle className="text-lg font-semibold">
                                Mais detalhes desta transação
                            </DialogTitle>
                            <DialogDescription asChild>
                                <div className="mt-4 space-y-2">
                                    <div className="flex justify-between border-b pb-1">
                                        <span className="font-semibold text-gray-700">ID:</span>
                                        <span className="text-gray-900">{transaction?.sale_id}</span>
                                    </div>

                                    <div className="flex justify-between border-b pb-1">
                                        <span className="font-semibold text-gray-700">Referência:</span>
                                        <span className="text-gray-900">{response?.output_ThirdPartyReference}</span>
                                    </div>

                                    <div className="flex justify-between border-b pb-1">
                                        <span className="font-semibold text-gray-700">Nome do comprador:</span>
                                        <span className="text-gray-900">{response?.buyer_name || 'N/A'}</span>
                                    </div>

                                    <div className="flex justify-between border-b pb-1">
                                        <span className="font-semibold text-gray-700">Descrição:</span>
                                        <span
                                            className={
                                                transaction?.status === "failed"
                                                    ? "text-red-600 font-medium"
                                                    : "text-gray-900"
                                            }
                                        >
                                            {response?.output_ResponseDesc}
                                        </span>
                                    </div>

                                    <div className="flex justify-between border-b pb-1">
                                        <span className="font-semibold text-gray-700">Origem:</span>
                                        <span className="uppercase text-gray-900">{transaction?.origin}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-semibold text-gray-700">Data de criacao:</span>
                                        <span className="uppercase text-gray-900">{transaction?.created_at}</span>
                                    </div>
                                </div>
                            </DialogDescription>
                        </DialogHeader>

                        <DialogFooter>{/* botões ou ações aqui */}</DialogFooter>
                    </DialogContent>

                </form>
            </Dialog>
        </div>
    )
}







export default function ListSales({ sales, setQueryTime, query_time, query_status, setQueryStatus }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const period = searchParams.get('period')

    const setQueryParam = (key, value) => {
        const params = new URLSearchParams(searchParams);
        params.set(key, value);
        router.push(`${pathname}?${params.toString()}`);
    };

    useEffect(() => {
        setQueryParam('period', query_time)
    }, [query_time])


    return (
        <div className="grid gap-3" >
            <p>Últimas 50 entradas.</p>
            {/* <div className="flex gap-3 justify-center items-center rounded-md p-2 bg-white" >
                <p className="text-[13px]" >Registros:</p>
                <input
                    onChange={(e) => setLimit(e.target.value)}
                    type="number" min={0} placeholder="10"
                    className="w-full text-sm focus:outline-none outline-none p-2 focus:ring-1 focus:ring-blue-500  border-[silver] border-1 rounded-md"
                />
                <button
                    type="button" onClick={() => setResLimit(limit)} className=" w-full max-w-30 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 text-[12px]">Aplicar filtros</button>
            </div> */}

            <div className="mb-4 bg-white p-4  ">
                <p className="mb-2 text-sm font-semibold text-gray-700">Periodo de atualização</p>
                <select
                    value={period}
                    onChange={(e) => setQueryTime(e.target.value)}
                    // onChange={(e) => {
                    //     router.push({
                    //         pathname: router.pathname,
                    //         query: { ...router.query, time: e.target.value }
                    //     }, undefined, { shallow: true });
                    // }}
                    name="time" id="time-filter"
                    className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500">

                    <option value="all">Maximo</option>
                    <option value="today">Hoje</option>
                    <option value="week">Esta semana</option>
                    <option value="month">Este mês</option>
                    <option value="last_month">Mês passado</option>
                    <option value="year">Este ano</option>
                </select>
                 
                 <p className="mb-2 text-sm font-semibold text-gray-700 mt-6">Estado:</p>
                <select
                    value={query_status}
                    onChange={(e) => setQueryStatus(e.target.value)}
                    name="status" id="status-filter"
                    className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                     <option disabled value="a">----------</option>
                    <option value="completed">Completado</option>
                    <option value="pending">Pendente</option>
                    <option value="failed">Falha</option>
                    <option value="all">Todos estados</option>
                    
                </select>
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
                            <th className="px-4 py-3 text-gray-600 font-semibold">Estado</th>
                            <th className="px-4 py-3 text-gray-600 font-semibold">Comprador/Email</th>
                            <th className="px-4 py-3 text-gray-600 font-semibold">Comprador/Celular</th>
                            <th className="px-4 py-3 text-gray-600 font-semibold">Pais</th>
                            <th className="px-4 py-3 text-gray-600 font-semibold">Data</th>
                            <th className="px-4 py-3 text-gray-600 font-semibold">Detalhes</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {[...sales].map((sale) => (
                            <tr key={sale.sale_id} className="hover:bg-gray-50">
                                <td className="px-4 py-2">{sale?.product_name || 'N/A'}</td>
                                <td className="px-4 py-2 font-[600] text-black/85 flex gap-2">
                                    <span>{sale?.currency}</span>
                                    <span>{sale.amount_paid || ''}</span>
                                </td>
                                <td className="px-4 py-2">{sale?.sale_id || 'N/A'}</td>
                                <td className="px-4 py-2">
                                    {renderMethodIcon(sale?.payment_method)}
                                </td>
                                <td className="px-4 py-2">
                                    {renderStatusColor(sale?.status)}
                                </td>
                                <td className="px-4 py-2">{(sale?.buyer_email || 'N/A').slice(0, 15) + '...' || 'N/A'}</td>

                                <td className="px-4 py-2">{sale?.buyer_phone || 'N/A'}</td>
                                <td className="px-4 py-2">{sale?.buyer_country || 'N/A'}</td>
                                <td className="px-4 py-2 ">{(sale.created_at).split('T')[0] || 'N/A'}</td>
                                <td className="px-4 py-2"><TransactionDetails transaction={sale} /></td>
                            </tr>
                        ))}


                    </tbody>
                </table>
            </div>
        </div>
    )
}