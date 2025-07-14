'use client'

import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Loader2Icon, ArrowLeft, CreditCard, AlertCircle, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"

const apiUrl = process.env.NEXT_PUBLIC_BASE_API_URL

const PAYMENT_METHODS = [
    { value: 'eMola', label: 'eMola', icon: '📱' },
    { value: 'Mpesa', label: 'M-Pesa', icon: '💳' }
]

const EditPayoutPage = () => {
    const params = useSearchParams()
    const holder = params.get('holder')
    const acc_id = params.get('acc_id')
    const methodId = params.get('id')
    const currentType = params.get('type')
    
    const [formData, setFormData] = useState({
        account_holder: holder || '',
        account_id: acc_id || '',
        method_type: currentType || ''
    })
    const [isSaving, setIsSaving] = useState(false)
    const [errors, setErrors] = useState({})
    const [notification, setNotification] = useState(null)
    
    const token = localStorage.getItem('sessionToken')
    const router = useRouter()

    // Auto-hide notification after 5 seconds
    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => {
                setNotification(null)
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [notification])

    const validateForm = () => {
        const newErrors = {}
        
        if (!formData.account_holder.trim()) {
            newErrors.account_holder = 'Nome do titular é obrigatório'
        }
        
        if (!formData.account_id.trim()) {
            newErrors.account_id = 'Número da conta é obrigatório'
        }
        
        if (!formData.method_type) {
            newErrors.method_type = 'Método de pagamento é obrigatório'
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

    const handleUpdate = async (e) => {
        e.preventDefault()
        
        if (!validateForm()) {
            setNotification({
                type: 'error',
                message: 'Por favor, preencha todos os campos obrigatórios'
            })
            return
        }

        setIsSaving(true)
        setNotification(null)

        try {
            const response = await axios.post(
                `${apiUrl}/api/payouts-methods/update`,
                {
                    methodId,
                    ...formData
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            if (response?.data?.statusCode === 200) {
                setNotification({
                    type: 'success',
                    message: 'Método de pagamento atualizado com sucesso!'
                })
                
                // Redirect after showing success message
                setTimeout(() => {
                    router.push('/dashboard/profile')
                }, 1500)
            }
        } catch (error) {
            console.error('Erro ao atualizar:', error)
            setNotification({
                type: 'error',
                message: error.response?.data?.message || 'Erro ao atualizar método de pagamento'
            })
        } finally {
            setIsSaving(false)
        }
    }

    const Notification = ({ type, message }) => (
        <div className={`
            flex items-center gap-3 p-4 rounded-lg border-l-4 mb-6 transition-all duration-300
            ${type === 'success' 
                ? 'bg-green-50 border-green-400 text-green-800' 
                : 'bg-red-50 border-red-400 text-red-800'
            }
        `}>
            {type === 'success' ? (
                <CheckCircle className="w-5 h-5" />
            ) : (
                <AlertCircle className="w-5 h-5" />
            )}
            <p className="text-sm font-medium">{message}</p>
        </div>
    )

    const FormField = ({ label, error, children }) => (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
                {label} <span className="text-red-500">*</span>
            </label>
            {children}
            {error && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {error}
                </p>
            )}
        </div>
    )

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <Button 
                        variant="ghost" 
                        className="mb-4 p-0 h-auto text-gray-600 hover:text-gray-900"
                        onClick={() => router.back()}
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Voltar
                    </Button>
                    
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <CreditCard className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-900">
                                Editar Método de Pagamento
                            </h1>
                            <p className="text-sm text-gray-600 mt-1">
                                Atualize as informações do seu método de pagamento
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sm:p-8">
                    {/* Notification */}
                    {notification && (
                        <Notification type={notification.type} message={notification.message} />
                    )}

                    {/* Form */}
                    <form onSubmit={handleUpdate} className="space-y-6">
                        {/* Account Holder */}
                        <FormField label="Nome do Titular" error={errors.account_holder}>
                            <Input
                                name="account_holder"
                                type="text"
                                placeholder="Digite o nome do titular"
                                value={formData.account_holder}
                                onChange={(e) => handleInputChange('account_holder', e.target.value)}
                                className={`${errors.account_holder ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                            />
                        </FormField>

                        {/* Account ID */}
                        <FormField label="Número da Conta" error={errors.account_id}>
                            <Input
                                name="account_id"
                                type="tel"
                                placeholder="Digite o número da conta"
                                value={formData.account_id}
                                onChange={(e) => handleInputChange('account_id', e.target.value)}
                                className={`${errors.account_id ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                            />
                        </FormField>

                        {/* Payment Method */}
                        <FormField label="Método de Pagamento" error={errors.method_type}>
                            <Select 
                                name="method_type"
                                value={formData.method_type}
                                onValueChange={(value) => handleInputChange('method_type', value)}
                            >
                                <SelectTrigger className={`w-full ${errors.method_type ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}>
                                    <SelectValue placeholder="Selecione o método de pagamento" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Métodos Disponíveis</SelectLabel>
                                        {PAYMENT_METHODS.map((method) => (
                                            <SelectItem key={method.value} value={method.value}>
                                                <div className="flex items-center gap-2">
                                                    <span>{method.icon}</span>
                                                    <span>{method.label}</span>
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </FormField>

                        {/* Terms Notice */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <div className="flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="text-sm font-medium text-blue-900 mb-1">
                                        Importante
                                    </p>
                                    <p className="text-sm text-blue-800">
                                        Certifique-se de que as informações estão corretas antes de salvar. 
                                        Dados incorretos podem afetar o processamento dos seus pagamentos.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
                            <Button 
                                type="button" 
                                variant="outline" 
                                onClick={() => router.back()}
                                className="sm:w-auto w-full"
                            >
                                Cancelar
                            </Button>
                            
                            <Button 
                                type="submit" 
                                disabled={isSaving}
                                className="sm:w-auto w-full bg-green-600 hover:bg-green-700"
                            >
                                {isSaving ? (
                                    <>
                                        <Loader2Icon className="w-4 h-4 mr-2 animate-spin" />
                                        Salvando...
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle className="w-4 h-4 mr-2" />
                                        Atualizar Método
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditPayoutPage