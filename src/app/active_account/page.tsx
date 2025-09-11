"use client"
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CreditCard, Shield, CheckCircle, Phone } from "lucide-react";
import axios from "axios";

const ActiveAccountPage = () => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState("")

    const handleActivation = async () => {
        try {
            const token = localStorage.getItem("sessionToken")
            setIsLoading(true);
            const request = await axios.post("https://api.droopay.com/api/user/activation", {
                payment_number: phoneNumber,
            },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            setResponse(request.data?.message)
            setIsLoading(false);
            window.location.href = "/dashboard"
        } catch (e) {
            console.log(e)
            setResponse(e?.message)
              setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Card Container */}
                <div className="bg-white sm:rounded-1xl  border border-gray-100 overflow-hidden">
                    {/* Header */}
                    {/* <div className="bg-blue-600 px-8 py-6 text-center">
                        <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                            <Shield className="w-8 h-8 text-green-500" />
                        </div>
                        <h1 className="text-2xl font-bold text-white mb-2">Activar Conta</h1>
                        <p className="text-blue-100 text-sm">Desbloqueie todos os recursos</p>
                    </div> */}

                    {/* Content */}
                    <div className="px-8 py-8 space-y-6">
                        <h1 className="text-2xl font-bold text-black mb-2 text-center">Activar Conta</h1>
                        <p className="text-center " >{response}</p>
                        {/* <p className="text-blue-100 text-sm ">Desbloqueie todos os recursos</p> */}

                        {/* Benefits */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                                <span>Acesso completo a todos os serviços</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                                <span>Activação vitalícia - sem mensalidades</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                                <span>Suporte técnico prioritário</span>
                            </div>
                        </div>

                        {/* Price highlight */}
                        <div className="bg-blue-50 rounded-xl p-6 text-center border border-blue-100">
                            <p className="text-gray-600 text-sm mb-2">Pagamento único de</p>
                            <p className="text-3xl font-bold text-gray-900">
                                300<span className="text-lg">,00 MT</span>
                            </p>
                        </div>

                        {/* Payment form */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <Phone className="w-4 h-4 inline mr-2" />
                                    Número eMola/M-pesa
                                </label>
                                <div className="relative">
                                    <input
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        type="tel"
                                        placeholder="84/87XXXXXXX"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none text-lg"
                                        maxLength={9}
                                    />
                                    <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                </div>
                            </div>

                            <Button
                                onClick={handleActivation}
                                disabled={!phoneNumber || phoneNumber.length < 9 || isLoading}
                                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-md font-semibold text-sm transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                            >
                                {isLoading ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white border-opacity-30 border-t-white rounded-md animate-spin"></div>
                                        Processando...
                                    </div>
                                ) : (
                                    "Activar conta"
                                )}
                            </Button>
                        </div>

                        {/* Security note */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <div className="flex gap-3">
                                <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-sm font-medium text-blue-900">Pagamento Seguro</p>
                                    <p className="text-xs text-blue-700 mt-1">
                                        Suas informações são protegidas com criptografia de ponta
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="bg-gray-50 px-8 py-4 text-center border-t border-gray-100">
                        <p className="text-xs text-gray-500">
                            Powered by <span className="font-semibold text-gray-700">Drop Pay</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ActiveAccountPage;