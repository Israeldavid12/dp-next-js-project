'use client'
import { useState } from "react"
import axios from "axios"

export default function Feedback() {
    const [send_email, setEmail] = useState(null)
    const [send_name, setName] = useState(null)
    const [text, setText] = useState(null)
    const [isSend, setSend] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    async function sendFeedBack(e) {
        try {
            e.preventDefault();
            setIsLoading(true)
            setSend(false)
            const formData = new FormData(e.target);
            const feedback_data = Object.fromEntries(formData.entries());
            console.log(feedback_data);

            // Simulating API call
            const req = await axios.post('https://drop-payments.vercel.app/api/v2/smtp/send-email', {
                templateType: '11-FEEDBACK',
                ...feedback_data
            });
            setSend(true)

            // Reset form
            setEmail('')
            setName('')
            setText('')
            e.target.reset()

        } catch (err) {
            console.log(err)
            setSend(false)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen w-full  py-12 px-4">
            <div className="w-fullh-full mx-auto">
                <div className="bg-white dark:bg-gray-800   overflow-hidden">
                    {/* Header */}
                    <div className="bg-[#252F3F] px-8 py-6">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                                <i className="bi bi-chat-heart text-white text-xl"></i>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white">Feedback & Sugestões</h2>
                                <p className="text-blue-100 text-sm">Sua opinião é muito importante para nós</p>
                            </div>
                        </div>
                    </div>

                    {/* Success Message */}
                    {isSend && (
                        <div className="mx-8 mt-6 p-4 bg-green-50 border border-green-200 rounded-lg dark:bg-green-900/20 dark:border-green-800">
                            <div className="flex items-center gap-3">
                                <i className="bi bi-check-circle-fill text-green-600 text-xl"></i>
                                <div>
                                    <h3 className="text-green-800 font-semibold dark:text-green-400">Feedback Enviado!</h3>
                                    <p className="text-green-700 text-sm dark:text-green-300">Obrigado pelo seu feedback. Responderemos em breve!</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Form */}
                    <div className="p-8">
                        <form onSubmit={sendFeedBack}>
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">

                                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                            <i className="bi bi-envelope me-2 text-blue-600"></i>
                                            Email
                                        </label>
                                        <input
                                            onChange={(e) => setEmail(e.target.value)}
                                            type="email"
                                            id="email"
                                            name="email"
                                            placeholder="seu@email.com"
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="nome" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                            <i className="bi bi-person me-2 text-blue-600"></i>
                                            Nome
                                        </label>
                                        <input
                                            onChange={(e) => setName(e.target.value)}
                                            type="text"
                                            id="nome"
                                            name="nome"
                                            placeholder="Seu nome completo"
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="conteudo" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                        <i className="bi bi-chat-text me-2 text-blue-600"></i>
                                        Sua Mensagem
                                    </label>
                                    <textarea
                                        onChange={(e) => setText(e.target.value)}
                                        id="conteudo"
                                        name="conteudo"
                                        placeholder="Compartilhe seu feedback, sugestão ou reportar um problema..."
                                        required
                                        rows="5"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-y transition-colors duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full px-6 py-4 bg-gradient-to-r bg-[#252F3F] text-white font-semibold rounded-lg hover:bg-[#3b4a63] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-lg.5 "
                                >
                                    {isLoading ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            Enviando...
                                        </span>
                                    ) : (
                                        <span className="flex items-center justify-center gap-2">
                                            <i className="bi bi-send"></i>
                                            Enviar Feedback
                                        </span>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Footer */}
                    <div className="bg-gray-50 dark:bg-gray-900 px-8 py-4">
                        <div className="flex items-center justify-center gap-6 text-sm text-gray-600 dark:text-gray-400">
                            <div className="flex items-center gap-2">
                                <i className="bi bi-shield-check text-green-600"></i>
                                <span>Dados protegidos</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <i className="bi bi-clock text-blue-600"></i>
                                <span>Resposta em até 24h</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <i className="bi bi-heart text-red-500"></i>
                                <span>Feedback valorizado</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}