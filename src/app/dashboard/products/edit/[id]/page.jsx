'use client'
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Loading } from '../../../_components/LoadindAnim'
import ShareLinks from '../../_components/ShareLinks'
import useUserId from '../../../../hooks/useUserId';
import InactiveALert from '../_components/InactiveALert'
import PayerNameToggle from '../_components/PayerNameToggle'
import PayerContactToggle from '../_components/PayerContactToggle'
import IsManualPriceToggle from '../_components/IsManualPriceToggle'
import { Edit3, DollarSign, Package, FileText } from 'lucide-react';
import { useRouter } from 'next/navigation';
const apiUrl = process.env.NEXT_PUBLIC_BASE_API_URL

const DeleteProuctButton = ({ id }) => {
  return (
    <a href={`/dashboard/products/delete/${id}`}
      className="flex justify-center items-center text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300  dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800 rounded-sm text-xs px-5 py-2.5 me-2 mb-2"><i className="bi bi-trash3"></i> Excluir</a>

  )
}


export default function EditProduct() {
  const [p_data, setData] = useState(null)
  const [is_active, setActive] = useState(false)
  const [response, setResponse] = useState(null);
  const params = useParams();
  const id = params.id;
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [is_save, setSave] = useState(false)
  const userId = useUserId()





  const handleSave = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    const is_manual_price = e.target.elements['is_manual_price'].checked;
    const payer_name_field = e.target.elements['payer_name_field'].checked;
    const payer_contact_field = e.target.elements['payer_contact_field'].checked;

    data.is_manual_price = is_manual_price;
    data.payer_name_field = payer_name_field
    data.payer_contact_field = payer_contact_field


    try {
      setActive(false)
      const token = localStorage.getItem('sessionToken')
      const req = await axios.post(apiUrl + '/api/products/update', {
        id,
        ...data
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setResponse(req?.data?.message)
      router.push('/dashboard/products')
      setResponse(null)

    } catch (e) {
      console.log(e)
      return
    }
  }


  const handleData = async () => {
    try {
      const token = localStorage.getItem('sessionToken')
      const req = await axios.post(apiUrl + '/api/products/data', { product_id: id }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (req?.request?.status === 200) {
        setData(req.data.product)
        setLoading(false)
      }
    } catch (e) {
      console.log(e)
      setData([])
      return
    } finally {
      setLoading(false)
    }
  }



  useEffect(() => {
    handleData()
  }, [userId])


  if (!p_data) return <Loading />



  return (
    <div>
      <div className="flex items-center gap-3 py-4 px-1">
        <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
          <Edit3 className="w-5 h-5 text-blue-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800">
          Editar produto
        </h1>
      </div>

      {p_data && p_data.is_active === true ? (
        <form onSubmit={handleSave} >
          <div className='bg-white p-7' >

            <div className='grid items-start sm:flex gap-4 mt-3 w-full'>


              <div className='grid w-full gap-3' >
                {response && (
                  <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                    {response}.
                  </div>
                )}

                <ShareLinks id={id} />
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    Preço <span className="text-red-500">*</span>
                    <span className="text-gray-500">(MT)</span>
                  </label>

                  <input
                    name="price"
                    onChange={()=> setActive(true)}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-gray-400"
                    defaultValue={p_data.price}
                    type="number"
                    placeholder="0.00"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Package className="w-4 h-4 text-blue-600" />
                    Nome do produto
                    <span className="text-red-500">*</span>
                  </label>

                  <input
                    name="name"
                    onChange={()=> setActive(true)}
                    defaultValue={p_data.name}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-gray-400"
                    type="text"
                    maxLength={100}
                    placeholder="Digite o nome do produto"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <FileText className="w-4 h-4 text-gray-600" />
                    Descrição
                    
                  </label>

                  <textarea
                    name="description"
                    onChange={()=> setActive(true)}
                    defaultValue={p_data.description}
                    maxLength={700}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-gray-400 resize-none"
                    rows="4"
                    placeholder="Descreva as características do produto..."
                  />
                </div>

                <PayerNameToggle p_data={p_data} setActive={setActive} />
                <PayerContactToggle p_data={p_data} setActive={setActive} />
                <IsManualPriceToggle p_data={p_data} setActive={setActive} />

              </div>

            </div>

            <div className='flex w-full justify-between  mt-6 text-[13px]' >
              <DeleteProuctButton id={id} />
              {is_active ? (
                <button
                  type='submit'
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-md  px-9 py-1 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 " ><i className="bi bi-floppy2"></i> Salvar
                  {is_save && (
                    <div className="animate-spin inline-block size-6 border-3 border-current border-t-transparent text-green-600 rounded-full dark:text-green-500" role="status" aria-label="loading">
                    </div>
                  )}
                </button>
              ) : (
                <button
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  rounded-sm  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800  opacity-50 cursor-not-allowed  text-xs px-5 py-2.5 me-2 mb-2" disabled ><i className="bi bi-floppy2 "></i> Salvar</button>

              )
              }

            </div>
          </div>
        </form>
      ) : (
        <InactiveALert />
      )
      }

    </div>
  );
}