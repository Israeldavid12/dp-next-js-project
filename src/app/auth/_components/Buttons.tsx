'use client';

import { useState, useEffect } from 'react';

export default function LoadingButton({ onClick, textButtton = "Confirmar" }) {
    const [loading, setLoading] = useState(false);
    const handleClick = () => {
        setTimeout(() => {
            setLoading(false);  // Ativa o estado de carregamento
        }, 4000)
        onClick()
        setLoading(true)
    }



    return (
        <button
            onClick={handleClick}
            disabled={loading}
            className={`flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition ${loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
        >
            {loading && (
                <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    ></circle>
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                </svg>
            )}
            {loading ? 'Processando...' : textButtton}
        </button>
    );
}
