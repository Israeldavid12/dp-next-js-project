"use client"
import { useState } from "react";
import { FileText, CreditCard, ExternalLink, ArrowRight } from "lucide-react";
import RadioCard from "./_components/RadioCard";
import { redirect } from "next/navigation";

export default function SelectType() {
    const [selectedRadio, setSelectedRadio] = useState(null);

    const handleRadioSelect = (id) => {
        setSelectedRadio(id);
        redirect(`/dashboard/products/create?p_type=${id}`)
    };

    const productTypes = [
        {
            id: "payments",
            icon: <CreditCard className="w-8 h-8 text-green-600" />,
            title: "Link de Pagamento",
            description: "Receber pagamentos diretamente",
            subtitle: "Ideal para serviços e vendas simples",
            bgColor: "bg-green-50 border-green-200",
            iconBg: "bg-green-100"
        },
        {
            id: "external",
            icon: <ExternalLink className="w-8 h-8 text-purple-600" />,
            title: "Produto Externo",
            description: "Produto hospedado em outro lugar",
            subtitle: "Redireciona para link externo",
            bgColor: "bg-purple-50 border-purple-200",
            iconBg: "bg-purple-100"
        },
        {
            id: "ebook",
            icon: <FileText className="w-8 h-8 text-blue-600" />,
            title: "eBook - Livros Digitais",
            description: "eBooks, Documentos, Assinaturas digitais",
            subtitle: "PDF, EPUB e outros formatos digitais",
            bgColor: "bg-blue-50 border-blue-200",
            iconBg: "bg-blue-100"
        }
    ];

    return (
        <div className="p-6 max-w-6xl mx-auto">

            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    Que tipo de produto irá vender?
                </h1>
                <p className="text-gray-600">
                    Escolha a opção que melhor se adequa ao seu produto
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 justify-center">
                {productTypes.map((type) => (
                    <div
                        key={type.id}
                        onClick={() => handleRadioSelect(type.id)}
                        className={`${type.bgColor} border-2 rounded-xl p-6 cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105`}
                    >
                        <div className={`${type.iconBg} w-16 h-16 rounded-lg flex items-center justify-center mb-4 mx-auto`}>
                            {type.icon}
                        </div>

                        <div className="text-center">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                {type.title}
                            </h3>
                            <p className="text-gray-600 mb-3">
                                {type.description}
                            </p>
                            <p className="text-sm text-gray-500">
                                {type.subtitle}
                            </p>
                        </div>

                        <div className="flex justify-center mt-4">
                            <ArrowRight className="w-5 h-5 text-gray-400" />
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}