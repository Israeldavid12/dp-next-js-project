'use client'
import { useState, useEffect, useRef } from 'react';
import ImageUploadPreview from './_components/PreviewImage'
import { redirect } from 'next/navigation';
import { useSearchParams } from 'next/navigation'
import { AddProductsLoad } from '../../_components/LoadindAnim'
import { CancelCreate } from './_components/Buttons';
import { useRouter } from 'next/navigation';
import Submit from './_components/Submit'








export default function CreateProduct() {
    const [type, setType] = useState(null)
    const [name, setName] = useState('');
    const [price, setPrice] = useState('')
    const [desc, setDesc] = useState('')
    const [external_link, setExternalLink] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const [output, setOutput] = useState('')
    const [sucessMessage, setSucessMessage] = useState('')
    const sucessOutPutRef = useRef(null);
    const router = useRouter();
    const [formData, setFormData] = useState(null)
    const [isSubmitting, setSubmitting] = useState(false)


    // const scrollParaSecao = () => {
    //     sucessOutPutRef.current?.scrollIntoView({ behavior: 'smooth' });
    //     setTimeout(() => {
    //         router.push('/dashboard/products');
    //     }, 6000)
    // };




    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries())
        setFormData(data)
        setSubmitting(!isSubmitting)
        return

    }



    const searchParams = useSearchParams();
    const productType = searchParams.get('p_type');
    if (productType) {
        useEffect(() => {
            setType(productType);
        }, [productType]); // Executa apenas quando productType mudar
    } else {
        redirect('/dashboard/products')
    }

    function handlePrice(e) {
        setPrice(e.target.value)
        if (parseInt(e.target.value) > 40000) {
            setOutput('O valor maximo para o preço é 40.000 .')
            e.target.value = 0
        }

    }
    function handleName(e) {
        setName(e.target.value)
        if ((e.target.value).length > 100) {
            setOutput('Numero maximo caracteres atingido para o nome.')
            e.target.value = ''
        }
    }

    function handleDescription(e) {
        setDesc(e.target.value)
        if ((e.target.value).length > 1000) {
            setOutput('Numero maximo caracteres atingido para a descricao.')
            e.target.value = ''
        }
    }









    return (
        <div className="grid gap-5 md:mt-4" >
            <div className='gird sm:flex gap-4' >
                <div className='flex gap-4' >
                    <p className="pl-5 text-2xl  font-[600]" >Criar novo produto <i className="bi bi-box"></i> </p>
                    <p className='text-lg'>{productType.toUpperCase()}</p>
                </div>
                <p className='text-lg text-red-500' >{output}</p>
                <p className='text-[21px] text-green-600 font-bold' ref={sucessOutPutRef} >{sucessMessage}</p>
            </div>
            <div>
                {isLoading && (
                    <AddProductsLoad />
                )}
                <form onSubmit={handleSubmit} className="grid w-[100%] gap-10 md:p-5   ">
                    <div className="grid sm:flex bg-white shadow-sm rounded-md gap-10 p-5 " >
                        <div className="w-full mx-auto">
                            <label className="block text-gray-700 text-sm mb-2" htmlFor="email">
                                Nome do produto
                            </label>
                            <input
                                id="name"
                                maxLength={100}
                                name='name'
                                type="text"
                                placeholder="Nome do produto"
                                className="w-full text-sm focus:outline-none outline-none p-2 focus:ring-1 focus:ring-blue-500  border-[silver] border-1 rounded-md"
                                required
                                onChange={handleName}
                            />
                            {/* <p className='text-[12px] pt-2' >{name.length}/100 Caracteres</p> */}
                        </div>
                        <div className="w-full sm:w-[50%] mx-auto">
                            <label className="block text-gray-700 text-sm mb-2" htmlFor="email">
                                Preço
                            </label>
                            <input
                                id="price"
                                name='price'
                                type="number"
                                required
                                maxLength={12}
                                placeholder="0.00"
                                className="w-full text-sm focus:outline-none outline-none p-2 focus:ring-1 focus:ring-blue-500  border-[silver] border-1 rounded-md"
                                onChange={handlePrice}
                            />

                        </div>
                    </div>



                    <div className="grid bg-white shadow-sm rounded-md gap-10 p-5 "  >
                        <p className="text-sm" >Descricao</p>
                        <textarea
                            onChange={handleDescription}
                            name='description'
                            required className="w-full h-[150px] text-sm p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="Digite aqui..."></textarea>
                        <p className='text-[12px]' >{desc.length}/1000 Caracteres</p>
                    </div>

                    {productType.toLowerCase() === 'external' && (
                        <div className='bg-white shadow-sm rounded-md gap-10 p-5'>
                            <label className="block text-gray-700 text-md mb-2 " htmlFor="link">
                                Link do local onde os compradores irao acessar o porduto
                            </label>
                            <input
                                name='link'
                                onChange={(e) => {
                                    console.log(document.getElementById('link').value)
                                    setExternalLink(e.target.value)
                                    console.log(external_link)
                                }}
                                id="link"
                                type="url"
                                placeholder="ex: https://"
                                className="w-full text-sm focus:outline-none outline-none p-2 focus:ring-1 focus:ring-blue-500  border-[silver] border-1 rounded-md"
                                required

                            />
                        </div>
                    )}

                    {productType.toLowerCase() !== 'payments' && (
                        <div className='bg-white shadow-sm rounded-md gap-10 p-5' >
                            <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Categoria</label>
                            <select name='category' onChange={(e) => setCategory(e.target.value)} id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  dark:focus:ring-blue-500 outline-none">
                                <option value="0" disabled >Selecione uma categoria</option>
                                <option value="1">Cursos Online</option>
                                <option value="2">Software e Ferramentas</option>
                                <option value="3">Mídia Digital</option>
                                <option value="4">Assinaturas</option>
                            </select>
                        </div>

                    )}


                    {productType.toLowerCase() === 'ebook' && (
                        <div className='grid bg-white shadow-sm rounded-md gap-10 p-5' >
                            <label className="block text-gray-700 text-sm mb-2" htmlFor="link">
                                Faca upload do <span><strong>EBOOK</strong></span> produto aqui
                                <span className="block text-gray-700 text-sm mb-2">
                                    Envie arquivos de até 25 MB (.pdf)
                                </span>
                            </label>

                            <input
                                name='ebook_field'
                                id="ebook_field"
                                type="file"
                                accept='application/pdf'
                                placeholder="ex: https://"
                                className="w-full h-[140px] text-sm focus:outline-none outline-none p-2 focus:ring-1 hover:opacity-75  border-[silver] border-1 rounded-md"
                                required

                            />
                        </div>
                    )}

                    <div className='grid sm:grid justify-between w-full bg-white shadow-sm rounded-md gap-10 p-5' >

                        <p>Envie arquivos de até 5 MB. [.png, .jpeg, .jpg]</p>
                        <div className='sm:flex grid flex-row justify-between items-center w-[100%] p-5 gap-5 ' >
                            <div className='grid gap-3' >
                                <p className='text-sm' >Imagem do produto</p>
                                <ImageUploadPreview elementId='image_product_field' />
                            </div>
                            <div className='grid gap-3' >
                                <p className='text-sm' >Baner do produto</p>
                                <ImageUploadPreview elementId='banner_product_field' />
                            </div>
                        </div>
                    </div>

                    <div className='flex justify-between' >
                        <button
                            type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs px-8 py-4 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"><i className="bi bi-plus"></i> Criar produto</button>

                        <CancelCreate />

                    </div>

                </form>
                {isSubmitting && (<Submit formData={formData} product_type={type} />)}
            </div>
        </div>
    );
}