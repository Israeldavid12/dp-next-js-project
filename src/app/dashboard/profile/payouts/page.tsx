"use client"

/* eslint-disable react/display-name */


import mpesaicon from '../../../../../public/images/mpesa.png'
import emolaicon from '../../../../../public/images/emola.png'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useSearchParams } from "next/navigation"
import { Input } from '@/components/ui/input'
import axios from 'axios'
import useUserId from '../../../hooks/useUserId'
import React from 'react'
const apiUrl = process.env.NEXT_PUBLIC_BASE_API_URL;

const PAYMENT_METHODS = {
    MPESA: 'Mpesa',
    EMOLA: 'eMola'
}


type FormInputProps = {
    label: string;
    value: string;
    onChange: (value: string) => void;
    type?: string;
    error?: string;
};

const FormInput: React.FC<FormInputProps> = React.memo(({ label, value, onChange, type = "text", error }) => (
    <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
            {label} <span className="text-red-500">*</span>
        </label>
        <Input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={`Digite ${label.toLowerCase()}`}
            className={`
        w-full px-3 py-2 border rounded-md shadow-sm transition-colors
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
        ${error ? 'border-red-300 bg-red-50' : 'border-gray-300'}
      `}
        />

        {error && (
            <p className="text-sm text-red-600 flex items-center gap-1">
                <i className="bi bi-exclamation-circle"></i>
                {error}
            </p>
        )}
    </div>
))



const PaymentMethodCard = ({ type, icon, isSelected, onClick }) => (
    <div
        onClick={onClick}
        className={`
                relative cursor-pointer rounded-lg border-2 p-4 transition-all duration-200
                ${isSelected
                ? 'border-blue-500 bg-blue-50 shadow-md'
                : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
            }
            `}
    >
        <Image
            alt={`${type} icon`}
            className="w-16 h-16 object-contain mx-auto"
            src={icon}
        />
        <p className="text-center mt-2 text-sm font-medium text-gray-700">{type}</p>
        {isSelected && (
            <div className="absolute top-2 right-2">
                <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                    <i className="bi bi-check text-white text-xs"></i>
                </div>
            </div>
        )}
    </div>
)


const AlertMessage = ({ type, message }) => (
    <div className={`
            p-4 rounded-lg border-l-4 
            ${type === 'success'
            ? 'bg-green-50 border-green-400 text-green-800'
            : 'bg-red-50 border-red-400 text-red-800'
        }
        `}>
        <div className="flex items-center gap-2">
            <i className={`bi ${type === 'success' ? 'bi-check-circle' : 'bi-exclamation-triangle'}`}></i>
            <p className="text-sm font-medium">{message}</p>
        </div>
    </div>
)








const PayoutsPage = () => {
    const [selectedType, setSelectedType] = useState(null)
    const [formData, setFormData] = useState({
        account_holder: '',
        account_id: ''
    })
    const [response, setResponse] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState<{ account_holder?: string; account_id?: string }>({})

    const searchParams = useSearchParams()
    const holder = searchParams.get('holder')
    const acc_id = searchParams.get('acc_id')
    const methodId = searchParams.get('methodId')
    const method_type = searchParams.get('type')
    const isFormValid = !!formData.account_holder?.trim() && !!formData.account_id?.trim();

    const userId = useUserId()

    // Initialize form data and payment type
    useEffect(() => {
        if (method_type) {
            const type = method_type.toLowerCase() === 'mpesa' ? PAYMENT_METHODS.MPESA : PAYMENT_METHODS.EMOLA
            setSelectedType(type)
        }

        if (holder || acc_id) {
            setFormData({
                account_holder: holder || '',
                account_id: acc_id || ''
            })
        }
    }, [method_type, holder, acc_id])

    const validateForm = () => {
        const newErrors: { account_holder?: string; account_id?: string } = {}

        if (!formData.account_holder.trim()) {
            newErrors.account_holder = 'Nome do titular é obrigatório'
        }

        if (!formData.account_id.trim()) {
            newErrors.account_id = 'Número da conta é obrigatório'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }))

        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: ''
            }))
        }
    }

    const handleSubmit = async () => {
        if (!validateForm()) return
        const token = localStorage.getItem('sessionToken')

        if (!token) {
            setResponse({
                type: 'error',
                message: 'Sessão expirada. Por favor, faça login novamente.'
            });
            setIsLoading(false);
            return;
        }

        setIsLoading(true)
        setResponse(null)

        try {
            const payload = {
                method_type: selectedType,
                account_holder: formData.account_holder,
                account_id: formData.account_id,
                methodId: methodId,
            }

            const req = await axios.post(apiUrl + '/api/payouts-methods/update', payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            if (req?.data) {
                setResponse({
                    type: 'success',
                    message: req.data.message || 'Informações salvas com sucesso!'
                })
            }
        } catch (error) {
            console.log('Erro ao salvar:', error)
            setResponse({
                type: 'error',
                message: 'Erro ao salvar informações. Tente novamente.'
            })
        } finally {
            setIsLoading(false)
        }
    }





    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sm:p-8">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <i className="bi bi-credit-card text-blue-600"></i>
                            </div>
                            <h1 className="text-xl font-semibold text-gray-900">
                                Métodos de Pagamento
                            </h1>
                        </div>

                        <p className="text-sm text-gray-600 leading-relaxed">
                            Atualize ou adicione um novo método de pagamento.<br />
                            <strong>Nota:</strong> Você pode adicionar até 3 formas de pagamento à sua conta.
                        </p>
                    </div>

                    {/* Success/Error Messages */}
                    {response && (
                        <div className="mb-6">
                            <AlertMessage type={response.type} message={response.message} />
                        </div>
                    )}

                    {/* Payment Method Selection */}
                    <div className="mb-8">
                        <h2 className="text-lg font-medium text-gray-900 mb-4">
                            Selecione o método de pagamento
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            <PaymentMethodCard
                                type={PAYMENT_METHODS.MPESA}
                                icon={mpesaicon}
                                isSelected={selectedType === PAYMENT_METHODS.MPESA}
                                onClick={() => setSelectedType(PAYMENT_METHODS.MPESA)}
                            />
                            <PaymentMethodCard
                                type={PAYMENT_METHODS.EMOLA}
                                icon={emolaicon}
                                isSelected={selectedType === PAYMENT_METHODS.EMOLA}
                                onClick={() => setSelectedType(PAYMENT_METHODS.EMOLA)}
                            />
                        </div>
                    </div>

                    {/* Form Fields */}
                    {selectedType && (
                        <div className="space-y-6">
                            <h2 className="text-lg font-medium text-gray-900">
                                Informações da Conta {selectedType}
                            </h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <FormInput
                                    label={`Número ${selectedType}`}
                                    value={formData.account_id}
                                    onChange={(value) => handleInputChange('account_id', value)}
                                    type="number"
                                    error={errors.account_id}
                                />

                                <FormInput
                                    label="Nome do Titular"
                                    value={formData.account_holder}
                                    onChange={(value) => handleInputChange('account_holder', value)}
                                    error={errors.account_holder}
                                />
                            </div>

                            {/* Terms */}
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                <div className="flex items-start gap-3">
                                    <i className="bi bi-info-circle text-yellow-600 mt-0.5"></i>
                                    <p className="text-sm text-yellow-800">
                                        Ao salvar essas informações, você garante que as mesmas são verdadeiras
                                        e assume total responsabilidade em caso de inconformidade entre os dados.
                                    </p>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-end">
                                <button
                                    onClick={handleSubmit}
                                    disabled={!isFormValid || isLoading}
                                    className={`
                                        flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-sm transition-all
                                        ${isFormValid && !isLoading
                                            ? 'bg-green-600 text-white hover:bg-green-700 shadow-sm hover:shadow-md'
                                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        }
                                    `}
                                >
                                    {isLoading ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            Salvando...
                                        </>
                                    ) : (
                                        <>
                                            <i className="bi bi-check-lg"></i>
                                            Salvar Informações
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}



export default PayoutsPage