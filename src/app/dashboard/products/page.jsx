'use client'
import React from 'react';
import { Plus, Package } from 'lucide-react';
import ListProducts from './_components/ListProducts';

export default function ProductsPage() {
  return (
    <div className="grid gap-6 w-full p-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <Package className="w-5 h-5 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Meus Produtos</h1>
        </div>

        <a 
          href="/dashboard/products/select/"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-4 py-2.5 text-sm transition-colors duration-200 shadow-sm hover:shadow-md"
        >
          <Plus className="w-4 h-4" />
          Criar produto
        </a>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <ListProducts />
      </div>

    </div>
  );
}