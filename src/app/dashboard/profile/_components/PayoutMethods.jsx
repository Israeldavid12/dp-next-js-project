'use client'
import axios from "axios"
import { useState, useEffect } from "react"






export default function PayoutMethods() {
    const [PayoutMethods, setPayoutsMethods] = useState(null)
     const token = localStorage.getItem('sessionToken')

     const handlePayouts = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/payouts-methods/all', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setPayoutsMethods(response?.data?.payouts)
        } catch (e) {
            console.log(e)
        }
     }

    useEffect(()=> {
       handlePayouts()
    },[token])


    return (
        <div className="overflow-x-auto bg-white p-3 rounded-md grid gap-3" >
            <p>Metodos de pagamento <i className="bi bi-credit-card-fill"></i></p>

            <div>
                <a href="/dashboard/profile/payouts/"
                    type="button" className="text-white m-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"><i className="bi bi-plus"></i> Adicionar </a>
            </div>
            <div>
                <table className="w-full divide-y divide-neutral-200 text-sm text-left">
                    <thead className="bg-white">
                        <tr>
                            <th className="px-4 py-3 text-gray-600 font-semibold">Tipo</th>
                            <th className="px-4 py-3 text-gray-600 font-semibold">Titular</th>
                            <th className="px-4 py-3 text-gray-600 font-semibold">Banco</th>
                            <th className="px-4 py-3 text-gray-600 font-semibold">Data de criação</th>
                            <th className="px-4 py-3 text-gray-600 font-semibold">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">

                        {PayoutMethods ? (

                            PayoutMethods.map((payout) => (
                                <tr key={payout.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-2">{(payout.method_type).toUpperCase()}</td>
                                    <td className="px-4 py-2">{payout.account_holder}</td>
                                    <td className="px-4 py-2">{payout.account_id || 'NA'}</td>
                                    <td className="px-4 py-2">{(payout.created_at).split("T")[0]} </td>
                                    <td className="flex gap-2" >
                                        <a className="flex justify-center text-white p-1.5 m-2 bg-green-600 rounded-sm w-30" href={`/dashboard/profile/payouts/edit/?id=${payout.methodid}&type=${payout.method_type}&holder=${payout.account_holder}&acc_id=${payout.account_id}&methodId=${payout.methodid}`}>Editar <i className="bi bi-pencil-square"></i></a>

                                        <a className="flex justify-center bg-white ring ring-[silver] p-1.5 m-2 text-black rounded-sm w-30" href={`/dashboard/profile/payouts/delete/?id=${payout.id}`}>Excluir </a>
                                    </td>
                                </tr>
                            ))

                        )
                            :
                            (
                                <p>
                                    Nenhum metodo de pagamento encotrado
                                </p>
                            )
                        }

                    </tbody>
                </table>
            </div>
        </div>
    )

}