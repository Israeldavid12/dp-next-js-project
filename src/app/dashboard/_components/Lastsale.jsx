'use client'
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

const LastSale = ({ lastSale }) => {
    const [id, setId] = useState('')
    const [amount, setAmount] = useState('')
    const [product_name, setName] = useState('')


    

    useEffect(() => {

        setId(lastSale?.sale_id || 'N/A')
        setAmount(lastSale?.amount_paid || '0.00 MT')
        setName(lastSale?.product_name || 'N/A')

    }, [lastSale])



    return (
        <div className="overflow-x-auto bg-white p-5 ">
            <p>Ultima transacao encotrada</p>
            <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-3 text-gray-600 font-semibold">Nome do produto</th>
                        <th className="px-4 py-3 text-gray-600 font-semibold">Montante</th>
                        <th className="px-4 py-3 text-gray-600 font-semibold">ID da transacao</th>
                        <th className="px-4 py-3 text-gray-600 font-semibold">Ações</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50">
                        <td className="px-4 py-2">{product_name}</td>
                        <td className="px-4 py-2">{amount}</td>
                        <td className="px-4 py-2">{id}</td>
                        <td className="px-4 py-2">
                            <a href="/dashboard/sales/" className="text-blue-600 hover:underline">Ver</a>
                        </td>
                    </tr>
                    {/* Mais linhas aqui... */}
                </tbody>
            </table>
        </div>
    );
};

export default LastSale;
