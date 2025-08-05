"use client"
import { useState } from "react";

export default function ActionMenu({id}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      {/* Botão dos três pontinhos */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 rounded-full hover:bg-gray-200 focus:outline-none"
      >
        <i className="bi bi-sliders hover:bg-zinc-300 rounded-full p-3 flex judtify-center items-center "></i>
      </button>

      {/* Modal dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-48 rounded-md shadow-lg bg-white ring-1 ring-black/5 z-1000">
          <div className="py-1">
            <a
              href={`/dashboard/products/edit/${id}`}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Editar
            </a>
            <a
               href={`/dashboard/products/edit/${id}`}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Links de divulgacao
            </a>
            <a
                href={`/dashboard/products/delete/${id}`}
              className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            >
              Excluir
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
