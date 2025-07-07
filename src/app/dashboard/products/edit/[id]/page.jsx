'use client'
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Loading } from '../../../_components/LoadindAnim'
import ImageUploadPreview from '../../create/_components/PreviewImage'
import ShareLinks from '../../_components/ShareLinks'
import useUserId from '../../../../hooks/useUserId';

export default function EditProduct() {
  const [p_data, setData] = useState(null)
  const [is_active, setActive] = useState(false)
  const [response, setResponse] = useState(null);
  const params = useParams();
  const id = params.id;
  const [form, setForm] = useState({
    name: null,
    price: null,
    description: null,
    id: id,
    payer_name: true,
    payer_contact: true,
    manual_price: false
  });
  const [loading, setLoading] = useState(true)
  const [is_save, setSave] = useState(false)
  const [count, setCount] = useState(0)
  const userId = useUserId()

  const handleSave = (e) => {
    setCount(count + 1)
  }


  function handlePrice(e) {
    setForm({ ...form, price: Number(e.target.value) })
    if (e.target.value >= 40000) {
      e.target.value = 0
      e.target.classList.remove('hover:ring-blue-500');
      e.target.classList.add('hover:ring-red-500');
    }
    setActive(true)
    setPrice(e.target.value)
  }
  function handleName(e) {
    setForm({ ...form, name: e.target.value })
    setActive(true)
    setName(e.target.value)
    if ((e.target.value).length > 100) {
      e.target.classList.remove('hover:ring-blue-500');
      e.target.classList.add('hover:ring-red-500');
      e.target.value = ''
    }
  }
  function handleDesc(e) {
    setForm({ ...form, description: e.target.value })
    setActive(true)
    setDesc(e.target.value)
    if ((e.target.value).length > 1000) {
      e.target.classList.remove('hover:ring-blue-500');
      e.target.classList.add('hover:ring-red-500');
      e.target.value = ''

    }
  }

  useEffect(() => {
    async function handleSave() {
      try {
        setActive(false)
        setResponse(null)
        const user_id = userId;
        const req = await axios.post('https://monsterbot.vercel.app/api/products', {
          reqType: 'update/product/data',
          form: {
            ...form,
            user_id: user_id,
          }
        });

        setResponse(req?.data?.message)
        setTimeout(() => {
          setResponse(null)
        }, 5000)
      } catch (e) {
        console.log(e)
        return
      }
    }

    if (count !== 0) {
      handleSave();
    }

  }, [count])




  useEffect(() => {
    async function handleData() {
      try {
        const req = await axios.post('https://monsterbot.vercel.app/api/products', {
          reqType: 'get/product/data',
          userId: userId,
          productId: id
        });

        if (req?.data?.code === 200) {
          setData(req.data.product)
          setLoading(false)
        } else {
          setData(null)
          setLoading(false)
          return null
        }

      } catch (e) {
        console.log(e)
        setData(null)
        setLoading(false)
        return null

      }
    }
    handleData()

  }, [userId])

  if (!p_data) return <Loading />



  return (
    <div>
      <p className='font-bold text-[20px] mt-3 mb-3' > Editar produto <i className="bi bi-pencil-square"></i></p>

      {p_data && p_data.is_active === true ? (
        <div className='bg-white p-7' >


          <div className='grid items-start sm:flex gap-4 mt-3 w-full'>
            <div className='grid gap-3'>
              <p>Imagem do produto</p>

              <img className='h-40 w-80 rounded-md' src={p_data.image_url} alt="image" />
              {/* <input onChange={() => setActive(true)} type="file" alt="image" /> */}
            </div>

            <div className='grid w-full gap-3' >
              {response && (
                <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                  {response}.
                </div>
              )}

              <ShareLinks id={id} />
              <p className='text-[15px] mt-3' >Informações básicas</p>
              <div className='w-full text-[13px]' >
                <p>Preço * (MT)</p>
                <input name='price' onChange={handlePrice} className='outline-none px-2 py-2 rounded-md ring-1 ring-[silver] 
             hover:ring-blue-500 w-full' defaultValue={p_data.price} type="number" />
              </div>

              <div className='w-full text-[13px]' >
                <p>Nome do produto *</p>
                <input name='name' onChange={handleName} defaultValue={p_data.name} className='outline-none px-2 py-2 rounded-md ring-1 ring-[silver] 
             hover:ring-blue-500 w-full' type="text" />
              </div>

              <div className='w-full text-[13px]' >
                <p>Descricao</p>
                <textarea name='description' onChange={handleDesc} className='outline-none px-2 py-2 rounded-md ring-1 ring-[silver] 
             hover:ring-blue-500 w-full text-[14px] h-50' defaultValue={p_data.description} type="text" />
              </div>

              <div className='flex justify-between w-full' >
                <p>Nome do pagador * </p>
                <label className="inline-flex items-center me-5 cursor-pointer">
                  <input onChange={(e) => {
                    setForm({ ...form, payer_name: e.target.checked })
                    setActive(true)
                  }} type="checkbox" value="" className="sr-only peer" defaultChecked={p_data.payer_name_field} />
                  <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600 dark:peer-checked:bg-green-600"></div>

                </label>
              </div>

              <div className='flex justify-between w-full' >
                <p>Contacto do pagador * </p>
                <label className="inline-flex items-center me-5 cursor-pointer">
                  <input onChange={(e) => {
                    setForm({ ...form, payer_contact: e.target.checked })
                    setActive(true)
                  }} type="checkbox" value="" className="sr-only peer" defaultChecked={p_data.payer_contact_field} />
                  <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600 dark:peer-checked:bg-green-600"></div>

                </label>
              </div>

              <div className='flex justify-between w-full' >
                <p>Preço inserido manualmente * </p>
                <label className="inline-flex items-center me-5 cursor-pointer">
                  <input onChange={(e) => {
                    setForm({ ...form, manual_price: e.target.checked })
                    setActive(true)
                  }} type="checkbox" value="" className="sr-only peer" defaultChecked={p_data.is_manual_price} />
                  <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600 dark:peer-checked:bg-green-600"></div>

                </label>
              </div>

            </div>

          </div>

          <div className='flex w-full justify-between  mt-6 text-[13px]' >
            <a href={`/dashboard/products/delete/${id}`}
              className="flex justify-center items-center text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300  dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800 rounded-sm text-xs px-5 py-2.5 me-2 mb-2"><i className="bi bi-trash3"></i> Excluir</a>

            {is_active ? (
              <button
                onClick={handleSave}
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
      ) : (
        <div>
          <p className='w-50 bg-red-500 p-1 text-[16px] rounded-lg text-white text-center ' >
            Produto desativado
          </p>
          <a className='underline' href="/dashboard/products"> Retroceder </a>
        </div>


      )
      }

    </div>
  );
}