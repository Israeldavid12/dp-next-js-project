import React from "react";
import Image from "next/image";
import logo from '../../../../public/images/fb-pixel.png';

export default function MetaPixelLayout() {
    return (
        <div className="p-9 text-gray-500  gap-5 flex flex-col bg-white " >
            <p>Configuração de Pixel</p>
            <Image src={logo} alt="Meta Pixel Logo" className="" />
            <p>ID do Pixel do Facebook</p>

            <input
                type="text"
                placeholder="Ex: 1234567"
                className="px-6 py-2 focus:ring-1
                 focus:ring-blue-600 rounded-md ring-1 ring-[silver" />
            <p>Token de Acesso do Servidor</p>
            <textarea
                placeholder="Ex: EAAJZCZA..."
                className="px-6 py-2 focus:ring-1
                 focus:ring-blue-600 rounded-md ring-1 ring-[silver"
            ></textarea>

            <div className="flex gap-4" >
                <button className="bg-blue-700 hover:bg-blue-500 text-white px-6 py-2 rounded-md" >Salvar Configuração</button>
                <a href="/dashboard" className="px-6 py-2 rounded-md flex justify-center items-center">Cancelar</a>

            </div>
        </div>
    )
}
