import React from 'react';
import { HelpCircle, Settings } from 'lucide-react';

export default function SettingsPage() {
    return (
        <div className="bg-white p-5 rounded-md h-full w-full flex justify-center items-center">
            <div className="flex flex-col items-center">
                <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                    <Settings className="w-8 h-8 text-orange-600" />
                </div>
                
                <div className="flex items-center gap-2 mb-3">
                    <p className="text-xl font-semibold text-gray-700">
                        Recurso temporariamente indisponível
                    </p>
                    <HelpCircle className="w-5 h-5 text-gray-500" />
                </div>
                
                <p className="text-sm text-gray-500 text-center">
                    Estamos trabalhando para disponibilizar em breve
                </p>
            </div>
        </div>
    );
}
