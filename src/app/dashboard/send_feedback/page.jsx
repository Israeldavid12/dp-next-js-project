'use client'
import axios from "axios"
import { useState, useEffect, use } from "react"


export default function Feedback() {
    const [send_email, setEmail] = useState(null)
    const [send_name, setName] = useState(null)
    const [text, setText] = useState(null)
    const [isSend, setSend] = useState(false)

    async function sendFeedBack(e) {
        try {
            e.preventDefault();
            setSend(false)
            const formData = new FormData(e.target);
            const feedback_data = Object.fromEntries(formData.entries());
            console.log(feedback_data);
            const req = await axios.post('https://drop-payments.vercel.app/api/v2/smtp/send-email', {
                templateType: '11-FEEDBACK',
                ...feedback_data
            });
            console.log(req?.data)
            setSend(true)

        } catch (err) {
            console.log(err)
            setSend(false)
        }
    }



    return (
        <div>
            <div id="feedback-section"
                className="feedback-section max-w-2xl mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-md mt-12">
                <h2 className="text-[20px] font-bold text-gray-800 mb-6">Envie seu Feedback ou Sugestão</h2>
                {isSend && (
                    <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                        Seu feedBack foi enviado e recebido!
                    </div>
                )}
                <form onSubmit={(e) => sendFeedBack(e)} id="feedback-form" className="feedback-form space-y-4">
                    <div className="form-group">
                        <label for="email" className="block text-sm font-medium text-gray-700">Email:</label>
                        <input onChange={(e) => setEmail(e.target.value)} type="email" id="email" name="email" placeholder="Seu email" required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div className="form-group">
                        <label for="nome" className="block text-sm font-medium text-gray-700">Nome:</label>
                        <input onChange={(e) => setName(e.target.value)} type="text" id="nome" name="nome" placeholder="Seu nome" required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div className="form-group">
                        <label for="conteudo" className="block text-sm font-medium text-gray-700">Conteúdo:</label>
                        <textarea onChange={(e) => setText(e.target.value)} id="conteudo" name="conteudo" placeholder="Escreva sua sugestão ou feedback aqui..."
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-y"
                            rows="4"></textarea>
                    </div>
                    <button type="submit"
                        className="submit-btn w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        Enviar
                    </button>
                </form>
            </div>
        </div>
    )
}