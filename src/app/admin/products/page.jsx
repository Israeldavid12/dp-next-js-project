'use client'
import Reac, { useState, useEffect } from 'react'
import axios from 'axios'
import styles from '../../dashboard/products/_components/product-grid.module.css'
import { Button } from '@/components/ui/button'
import { Loading } from '@/app/dashboard/_components/LoadindAnim'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useRouter } from 'next/navigation'




const ChangeProductStatus = ({ id, setLoading }) => {
    const [isActive, setActive] = useState(false)
    const [status, setStatus] = useState('')
    const [count, setCount] = useState(0)
    const router = useRouter()



    useEffect(() => {
        const token = localStorage.getItem('sessionToken')
        if (count !== 0) {
            axios.post('http://localhost:4000/api/admin/products/update/status', {
                id: id,
                status: status
            },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then(response => {
                    setLoading(false)
                    window.location.reload()
                }).catch(err => {
                    console.log(err)
                    window.location.reload()
                });
        }

    }, [count])

    return (
        <>


            <Dialog>
                <form>
                    <DialogTrigger asChild>
                        <Button variant='outline' className='bg-white text-black h-8'>
                            Editar estado
                        </Button>

                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Alterar estado</DialogTitle>
                            <DialogDescription>
                                Apos o envio o proprietario do produto podera ver o estado atual do produto
                            </DialogDescription>
                        </DialogHeader>

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button onClick={() => {
                                    setCount(count + 1)
                                    setStatus('rejected')
                                }} variant="outline">Rejeitar</Button>
                            </DialogClose>
                            <DialogClose asChild>
                                <Button onClick={() => {
                                    setCount(count + 1)
                                    setStatus('approved')
                                }} >Aprovar</Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </form>
            </Dialog>

        </>
    )
}



const Products = () => {
    const [products, setProducts] = useState()
    const [is_loading, setLoading] = useState(true)

    useEffect(() => {
  (async () => {
    try {
      const token = localStorage.getItem('sessionToken');
      const { data } = await axios.get('http://localhost:4000/api/admin/products/all', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts(data?.products);
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  })();
}, []);



    if (is_loading) return <Loading />;


    return (
        <div className='sm:p-4' >
            <p className='text-[20px] font-bold' >Produtos aguardando aprovacao</p>




            <div className={styles.gridProducts}>





                {products && products.length > 0 ? (

                    products.map((product) => (
                        <div key={product.id} className='grid gap-2 h-100 w-70  w-max-md mx-auto bg-white p-4 shadow-lg transition duration-200 ease-in-out transform hover:scale-103' >
                            <img className='h-40 w-full rounded-md' src={product.image_url} alt="image" />
                            <p className='text-xs' >ID: {product.id}</p>
                            <p className='text-[18px] font-bold text-green-700' >{product.price} MT</p>
                            {product.status = 'pending' ? (
                                <p className="text-[12px]">
                                    ESTADO: <span className="bg-yellow-600 p-2 text-[12px] text-white rounded-lg">Aguardando aprovação</span>
                                </p>
                            ) : (
                                <p className="text-[12px]">
                                    ESTADO: <span className="bg-red-500 p-1 text-[11px] rounded-lg">INACTIVO</span>
                                </p>
                            )}
                            <div className='flex justify-between gap-3' >
                                <p className='font-bold text-start text-[13px]' >{product.name}</p>

                            </div>

                            <div className='flex justify-end gap-3 w-full py-3' >
                                <a href={`/admin/products/details?name=${product.name}&desc=${product?.description}&img=${product.image_url}&banner=${product.banner_url}`} target='blank' className='text-[13px] flex gap-2 hover:underline'>
                                    Detalhes <i class="bi bi-eye"></i>
                                </a>


                                <ChangeProductStatus id={product.id} setLoading={setLoading} />



                            </div>

                        </div>

                    ))
                )
                    : (
                        <p className="text-center font-bold text-2xl">
                            NENHUM PRODUTO PENDENTE FOI ENCONTRADO
                        </p>
                    )
                }

            </div>
        </div>
    )
}

export default Products
