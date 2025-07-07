'use client'
import React from 'react'
import { Input } from "@/components/ui/input"
import { useSearchParams } from 'next/navigation'
import { Textarea } from "@/components/ui/textarea"



const Details = () => {
    const searchParams = useSearchParams()
    const name = searchParams.get('name')
    const desc = searchParams.get('desc')
    const image = searchParams.get('img')
    const banner = searchParams.get('banner')


    return (
        <div className='grid gap-3' >
            <p className='font-bold text-[20px]' >Detalhes do produto</p> 
            <a href="/admin/products"><i class="bi bi-arrow-left"></i> Voltar</a>
            <p>Nome do produto *</p>
            <Input type="email" value={name} placeholder="Nome do produto" />

            <p>Descricao do produto *</p>
            <Textarea value={desc} />

            <div>
                <p className='font-bold' >Imagem do produto</p>

                <img src={image} className='w-100 shadow-md' alt="" />
            </div>

            <div>
                <p className='font-bold' >Banner do produto</p>

                <img src={banner} className='w-100 shadow-md' alt="" />
            </div>


        </div>
    )
}

export default Details
