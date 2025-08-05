'use client'
import ActionMenu from './ProductsActions'
import { Suspense, useState, useEffect } from 'react'
import { Loading } from '../../_components/LoadindAnim'
import styles from './product-grid.module.css'
import axios from 'axios'
import useUserId from '../../../hooks/useUserId'
const apiUrl = process.env.NEXT_PUBLIC_BASE_API_URL


const ProductStatus = ({ status }) => {
    if (status === 'pending') {
        return (
            <div className="bg-[#FFFBEB] p-2 text-[12px] text-yellow-600 rounded-lg font-bold">Pendente</div>
        )
    } else if (status === 'approved') {
        return (
            <div className="bg-[#ECFDF5] p-2 text-[12px] text-green-600 rounded-lg font-bold">Activo</div>
        )
    } else if (status === 'rejected') {
        return (
            <div className="bg-[#FEF2F2] p-2 text-[12px] text-red-600 rounded-lg font-bold">Rejeitado</div>
        )
    }
}

const SendReview = ({ id }) => {

    return (
        <div>
            Solicitar revisao
        </div>
    )

}


export default function ListProducts() {
    const [actions, setAction] = useState(false)
    const [is_active, setActive] = useState(false)
    const [products, setProducts] = useState(null);
    const [loading, setLoading] = useState(true)
    const userId = useUserId()


    useEffect(() => {
        async function fetchProducts() {
            try {

                if (userId) {
                    setLoading(true)
                    const req = await axios.get(apiUrl+'/api/products/all',{
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('sessionToken')}`
                        }
                    });

                    if (Array.isArray(req.data?.products) && req.data.products.length > 0) {
                        setProducts(req.data.products);
                        setLoading(false)
                    } else {
                        setProducts([]);
                        setLoading(false)
                    }
                }
            } catch (e) {
                setProducts([]);
                setLoading(false)
            } finally {
                setLoading(false)
            }
        }

        fetchProducts();
    }, [userId]);

    if (!products) return <Loading />


    return (
        <div>
            <div>
                <div className="relative shadow-md ">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input type="search" id="search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none" placeholder="Search" required />
                </div>

            </div>
            <br />

            <Suspense fallback={<Loading />} >
                <div className={styles.gridProducts}>

                    {products && products.length > 0 ? (

                        products.map((product) => (
                            <div key={product.id} className='grid gap-2 h-83 w-70  w-max-md mx-auto bg-white p-4 shadow-md transition duration-200 ease-in-out transform hover:scale-103' >
                                <img className='h-40 w-full rounded-md' src={product.image_url} alt="image" />
                                <p className='text-xs' >ID: {product.id}</p>
                                <p className='text-xs font-bold text-green-700' >{product.price} MT</p>
                                <ProductStatus status={product.status} />
                                <div className='flex justify-between gap-3' >
                                    <p className='font-bold text-start text-[13px]' >{product.name}</p>
                                    <ActionMenu id={product.id} />
                                </div>

                            </div>

                        ))
                    )
                        : (
                            <div className="flex flex-col items-center justify-center py-12 px-4">
                                <div className="mb-4">
                                    <i className="bi bi-box text-4xl text-gray-400 dark:text-gray-500"></i>
                                </div>

                                <p className="text-center font-semibold text-gray-700 dark:text-gray-300 text-lg mb-6">
                                    NENHUM PRODUTO ENCONTRADO
                                </p>

                                <a
                                    href="/dashboard/products/select/"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
                                >
                                    <i className="bi bi-plus-circle"></i>
                                    Criar Produto
                                </a>
                            </div>
                        )
                    }

                </div>

            </Suspense>

        </div>
    )
}