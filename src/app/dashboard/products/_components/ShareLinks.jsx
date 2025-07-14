import React, { useState } from 'react';
import { ExternalLink, Copy, Check } from 'lucide-react';

export default function ShareLinks({ id = "demo123" }) {
    const [copied, setCopied] = useState(false);
    const paymentUrl = `https://checkout.droopay.com/${id}`;
    const checkoutUrl = `https://checkout.droopay.com/${id}`;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(paymentUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    return (
        <div className="space-y-4 p-4 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl shadow-sm border border-blue-200">
            <div className="flex items-center space-x-2 mb-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <ExternalLink className="w-3 h-3 text-white" />
                </div>
                <h3 className="text-sm font-semibold text-gray-700">
                    Link de Divulgação / Página de Pagamento
                </h3>
            </div>
            
            <div className="bg-white rounded-lg border-2 border-gray-200 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100 transition-all duration-300 shadow-sm hover:shadow-md">
                <div className="flex items-center p-3">
                    <div className="flex-1 min-w-0">
                        <input 
                            className="w-full text-sm text-blue-600 font-medium bg-transparent outline-none truncate" 
                            type="text" 
                            value={paymentUrl}
                            readOnly
                        />
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-3">
                        <button
                            onClick={handleCopy}
                            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors duration-200 flex items-center justify-center"
                            title="Copiar link"
                        >
                            {copied ? (
                                <Check className="w-4 h-4 text-green-500" />
                            ) : (
                                <Copy className="w-4 h-4" />
                            )}
                        </button>
                        
                        <a 
                            target="_blank" 
                            rel="noopener noreferrer"
                            href={checkoutUrl}
                            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors duration-200 flex items-center justify-center"
                            title="Abrir em nova aba"
                        >
                            <ExternalLink className="w-4 h-4" />
                        </a>
                    </div>
                </div>
            </div>
            
            {copied && (
                <div className="flex items-center space-x-2 text-green-600 text-sm">
                    <Check className="w-4 h-4" />
                    <span>Link copiado para a área de transferência!</span>
                </div>
            )}
            
            <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg border border-gray-200">
                <p className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    Compartilhe este link para receber pagamentos
                </p>
            </div>
        </div>
    );
}