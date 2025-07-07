'use client'
import { useState, useEffect, use } from "react"
import DialogDemo from '../_components/ConfirmSaque'
import axios from "axios"


export default function Saques() {
  const [payouts, setPayouts] = useState(null)
  const token = localStorage.getItem('sessionToken')

  const handleAprove = async (payoutId) => {
    try {
      const result = await axios.post('http://localhost:4000/api/admin/payout-update', { payout_id: payoutId }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      window.location.reload();

    } catch (e) {
      console.log(e)
    }
  }


  useEffect(() => {
    async function getPayouts() {
      try {
        const result = await axios.get('http://localhost:4000/api/admin/payout-requests', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setPayouts(result?.data?.payouts)
      } catch (e) {
        console.log(e)
      }
    }

    getPayouts()

  }, [token])

  return (
    <>
      <div className="bg-white px-8 py-3 grid gap-3" >

        <strong> <h1>Administrar saques</h1></strong>
        <div>
          <div className="relative shadow-md ">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input type="search" id="search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none" placeholder="Nome, Id, data do saque" required />
          </div>
        </div>

        {payouts ? (
          payouts.map((payout) => (
            <div key={payout?.id} className="bg-white grid sm:flex gap-4 p-4 shadow-md justify-between items-center" >
              <p className="font-bold" >Solicitação de saque recebída de "{payout?.name}" ás {(payout?.requested_at)?.split('T')[1]?.replace('Z', ' ')}</p>
              <p>{(payout?.requested_at)?.split('T')[0]}</p>
              <p className="text-orange-600" >{payout?.status}</p>
              <DialogDemo payout={payout} />

              <button
                onClick={() => handleAprove(payout?.id)}
                className="bg-accent text-black px-3 py-2 rounded-md hover:bg-black/20" >Aprovar</button>
              {/* <button className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600" >Rejeitar</button> */}
            </div>
          ))
        )
          :
          (
            <p>Nenhum saque disponivel</p>
          )
        }


      </div>
    </>
  )
}