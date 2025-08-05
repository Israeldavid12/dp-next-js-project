'use client'

import axios from "axios"
import { useState, useEffect } from "react"

const apiUrl = process.env.NEXT_PUBLIC_BASE_API_URL

export default function PayoutMethods() {
    const [payoutMethods, setPayoutMethods] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const token = localStorage.getItem('sessionToken')

    const handlePayouts = async () => {
        if (!token) {
            setError('Token de autenticação não encontrado')
            setLoading(false)
            return
        }

        try {
            setLoading(true)
            setError(null)
            
            const response = await axios.get(`${apiUrl}/api/payouts-methods/all`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            
            setPayoutMethods(response?.data?.payouts || [])
        } catch (err) {
            console.error('Erro ao buscar métodos de pagamento:', err)
            setError('Erro ao carregar métodos de pagamento')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        handlePayouts()
    }, [token])

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('pt-BR')
    }

    const ActionButton = ({ href, className, children, icon }) => (
        <a
            href={href}
            className={`flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:shadow-md ${className}`}
        >
            {children}
            {icon && <i className={icon}></i>}
        </a>
    )

    if (loading) {
        return (
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <span className="ml-2 text-gray-600">Carregando...</span>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-center py-8">
                    <div className="text-red-500 mb-4">
                        <i className="bi bi-exclamation-triangle text-2xl"></i>
                    </div>
                    <p className="text-red-600">{error}</p>
                    <button
                        onClick={handlePayouts}
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Tentar novamente
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-white rounded-lg shadow-sm">
            {/* Header */}
            <div className="border-b border-gray-200 p-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                        <i className="bi bi-credit-card-fill text-blue-600"></i>
                        Métodos de Pagamento
                    </h2>
                    
                    <ActionButton
                        href="/dashboard/profile/payouts/"
                        className="bg-blue-600 text-white hover:bg-blue-700"
                        icon="bi bi-plus"
                    >
                        Adicionar Método
                    </ActionButton>
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                {payoutMethods && payoutMethods.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Tipo</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Titular</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Banco</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Data de Criação</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {payoutMethods.map((payout) => (
                                    <tr key={payout.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="py-4 px-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                {payout.method_type?.toUpperCase() || 'N/A'}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4 text-gray-900">
                                            {payout.account_holder || 'N/A'}
                                        </td>
                                        <td className="py-4 px-4 text-gray-600">
                                            {payout.account_id || 'N/A'}
                                        </td>
                                        <td className="py-4 px-4 text-gray-600">
                                            {formatDate(payout.created_at)}
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="flex gap-2">
                                                <ActionButton
                                                    href={`/dashboard/profile/payouts/edit/?id=${payout.methodid}&type=${payout.method_type}&holder=${payout.account_holder}&acc_id=${payout.account_id}&methodId=${payout.methodid}`}
                                                    className="bg-green-600 text-white hover:bg-green-700"
                                                    icon="bi bi-pencil-square"
                                                >
                                                    Editar
                                                </ActionButton>
                                                
                                                {/* <ActionButton
                                                    href={`/dashboard/profile/payouts/delete/?id=${payout.id}`}
                                                    className="bg-white text-red-600 border border-red-200 hover:bg-red-50"
                                                    icon="bi bi-trash"
                                                >
                                                    Excluir
                                                </ActionButton> */}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="text-gray-400 mb-4">
                            <i className="bi bi-credit-card text-4xl"></i>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            Nenhum método de pagamento encontrado
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Adicione um método de pagamento para começar a receber seus pagamentos.
                        </p>
                        <ActionButton
                            href="/dashboard/profile/payouts/"
                            className="bg-blue-600 text-white hover:bg-blue-700"
                            icon="bi bi-plus"
                        >
                            Adicionar Primeiro Método
                        </ActionButton>
                    </div>
                )}
            </div>
        </div>
    )
}