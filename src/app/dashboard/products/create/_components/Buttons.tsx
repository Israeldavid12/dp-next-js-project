import { X, ArrowLeft } from "lucide-react";

export function CancelCreate() {
    return (
        <a 
            href='/dashboard/products/'
            className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg px-4 py-2.5 text-sm transition-colors duration-200 shadow-sm hover:shadow-md"
        >
            <ArrowLeft className="w-4 h-4" />
            Cancelar criação
        </a>
    );
}