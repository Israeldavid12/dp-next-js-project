import { AlertTriangle, ArrowLeft } from 'lucide-react';

const InactiveALert = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="max-w-md p-4 bg-white rounded-md shadow-lg text-center">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full">
                    <AlertTriangle className="w-8 h-8 text-red-500" />
                </div>

                <h2 className="mb-2 text-xl font-bold text-gray-800">Produto Desativado</h2>
                <p className="mb-6 text-gray-600">Este produto não está mais disponível</p>

                <a
                    href="/dashboard/products"
                    className="inline-flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Voltar aos Produtos
                </a>
            </div>
        </div>
    )
}

export default InactiveALert;