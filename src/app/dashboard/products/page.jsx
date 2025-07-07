'use client'
import Image from "next/image";
import ImageIcon from '../../../../public/images/logo.png'
import ListProducts from './_components/ListProducts'
import { redirect } from "next/navigation";





export default function ProductsPage() {
  return (
    <div className="grid sm:gap-4 w-[100%] sm:pt-5" >

      <div className="flex w-[100%] justify-between">
        <p className="text-[20px]" ><strong>Meus Produtos</strong></p>

        <a href="/dashboard/products/select/"
         type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"><i className="bi bi-plus"></i> Criar produto</a>
      </div>

      <div>
        <ListProducts />
      </div>

    </div>
  );
}