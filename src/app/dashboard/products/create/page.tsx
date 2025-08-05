'use client'
import { useState, useEffect, useRef } from 'react';
import ImageUploadPreview from './_components/PreviewImage'
import { redirect } from 'next/navigation';
import { useSearchParams } from 'next/navigation'
import { AddProductsLoad } from '../../_components/LoadindAnim'
import { CancelCreate } from './_components/Buttons';
import { useRouter } from 'next/navigation';
import Submit from './_components/Submit'
import { Package, FileText, DollarSign, ExternalLink, Tag, Upload, CheckCircle, AlertCircle } from 'lucide-react';

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
    const [selectedFile, setSelectedFile] = useState(null);


    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) setSelectedFile(file);
    };

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

            {/* Cabeçalho */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Package className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <h1 className="text-1xl font-bold text-gray-800">Criar novo produto</h1>
                            <span className="inline-block mt-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                                {productType.toUpperCase()}
                            </span>
                        </div>
                    </div>

                    {/* Mensagens de feedback */}
                    {output && (
                        <div className="flex items-center gap-2 text-red-600 bg-red-50 px-3 py-2 rounded-lg border border-red-200">
                            <AlertCircle className="w-4 h-4" />
                            <span className="text-sm">{output}</span>
                        </div>
                    )}

                    {sucessMessage && (
                        <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-2 rounded-lg border border-green-200">
                            <CheckCircle className="w-4 h-4" />
                            <span className="text-sm">{sucessMessage}</span>
                        </div>
                    )}
                </div>
            </div>


            {/* Formulário */}
            <div>
                {isLoading && (
                    <AddProductsLoad />
                )}
                <form onSubmit={handleSubmit} className="grid w-[100%] gap-10 md:p-5   ">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                    <FileText className="w-4 h-4" />
                                    Nome do produto
                                </label>
                                <input
                                    name="name"
                                    type="text"
                                    maxLength={100}
                                    placeholder="Nome do produto"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                    onChange={handleName}
                                    required
                                />
                                <p className="text-xs text-gray-500 mt-1">{name.length}/100 caracteres</p>
                            </div>

                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                    <DollarSign className="w-4 h-4" />
                                    Preço
                                </label>
                                <input
                                    name="price"
                                    type="number"
                                    placeholder="0.00"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                    onChange={handlePrice}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Descrição */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                            <FileText className="w-4 h-4" />
                            Descrição
                        </label>
                        <textarea
                            name="description"
                            placeholder="Descreva seu produto..."
                            className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                            onChange={handleDescription}
                            required
                        />
                        <p className="text-xs text-gray-500 mt-1">{desc.length}/1000 caracteres</p>
                    </div>

                    {/* Link Externo */}
                    {productType.toLowerCase() === 'external' && (
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                                <ExternalLink className="w-4 h-4" />
                                Link do produto
                            </label>
                            <p className="text-sm text-gray-600 mb-3">
                                Link onde os compradores irão acessar o produto
                            </p>
                            <input
                                name="link"
                                type="url"
                                placeholder="https://exemplo.com"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                onChange={(e) => setExternalLink(e.target.value)}
                                required
                            />
                        </div>
                    )}

                    {/* Categoria */}
                    {productType.toLowerCase() !== 'payments' && (
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                                <Tag className="w-4 h-4" />
                                Categoria
                            </label>
                            <select
                                name="category"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                // onChange={(e) => setCategory(e.target.value)}
                                required
                            >
                                <option value="0" disabled>Selecione uma categoria</option>
                                <option value="1">Cursos Online</option>
                                <option value="2">Software e Ferramentas</option>
                                <option value="3">Mídia Digital</option>
                                <option value="4">Assinaturas</option>
                            </select>
                        </div>
                    )}

                    {/* Upload de eBook */}
                    {productType.toLowerCase() === 'ebook' && (
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                                <Upload className="w-4 h-4" />
                                Upload do eBook
                            </label>
                            <p className="text-sm text-gray-600 mb-4">
                                Envie arquivos de até 10 MB (.pdf)
                            </p>

                            <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer">
                                <input
                                    name="ebook_field"
                                    id="ebook_field"
                                    type="file"
                                    accept="application/pdf"
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                    onChange={handleFileChange}
                                    required
                                />

                                <div className="pointer-events-none">
                                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                                    <p className="text-sm text-gray-600">
                                        {selectedFile
                                            ? `Arquivo selecionado: ${selectedFile.name}`
                                            : "Clique para enviar ou arraste o arquivo aqui"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}





                    <div className='grid sm:grid justify-between w-full bg-white shadow-sm rounded-md gap-10 p-5' >

                        <p>Envie arquivos de até 5 MB. [.png, .jpeg, .jpg]</p>
                        <div className='sm:flex grid flex-row justify-between items-center w-[100%] p-5 gap-5 ' >
                            <div className='grid gap-3' >
                                <p className='text-1xl font-bold' >Imagem do produto</p>
                                <ImageUploadPreview elementId='image_product_field' />
                            </div>
                            <div className='grid gap-3' >
                                <p className='text-1xl font-bold' >Baner do produto</p>
                                <ImageUploadPreview elementId='banner_product_field' />
                            </div>
                        </div>
                    </div>

                    <div className='flex justify-between' >
                        <button
                            type="submit"
                            className="group relative text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:ring-4 focus:ring-blue-300 font-semibold rounded-lg text-sm px-8 py-4 me-2 mb-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 dark:from-blue-600 dark:to-blue-700 dark:hover:from-blue-700 dark:hover:to-blue-800 focus:outline-none dark:focus:ring-blue-800 overflow-hidden"
                        >
                            <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                            <span className="relative flex items-center justify-center gap-2">
                                <i className="bi bi-plus-circle text-lg group-hover:rotate-90 transition-transform duration-300"></i>
                                <span className="font-medium">Criar Produto</span>
                            </span>
                        </button>

                        <CancelCreate />

                    </div>

                </form>
                {isSubmitting && (<Submit formData={formData} product_type={type} />)}
            </div>
        </div>
    );
}