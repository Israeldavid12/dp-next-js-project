'use client'
import axios from "axios";
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import mpesa from '../../../../../public/images/mpesa.png'

function Form({ setShowPopUp, balances, responseRequest, payouts_wallets  }) {
    const [formData, setFormData] = useState(null)
    const [count, setCount] = useState(0)
    const [is_request, setRequest] = useState(false)



    useEffect(() => {

        async function handleRequest() {
            try {
                setRequest(true)
                const token = localStorage.getItem('sessionToken')
                if (!token) throw new Error('Invalid session');

                const payload = {
                    ...formData,
                }

                const req = await axios.post('http://localhost:4000/api/withdraw/request-withdraw', payload, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setRequest(false)
                responseRequest(req?.data?.message)
                setTimeout(() => {
                    window.location.reload();
                }, 3000)
            } catch (e) {
                console.log(e)
                setRequest(false)
                if (e.response.data) {
                    responseRequest(e.response.data.message)
                    return
                }
                responseRequest(e.message)
                return
            }
        }
        if (count !== 0) {
            handleRequest()
        }
    }, [count]);

    function onSubmit(e) {
        e.preventDefault()
        const formData_ = new FormData(e.target);
        const data = Object.fromEntries(formData_.entries());
        setFormData(data)
        setCount(count + 1)
    }

    return (
        <form onSubmit={onSubmit} >
            <div className="grid gap-2" >
                <label htmlFor="w_amount">Montante: </label>
                <input
                    required
                    name="amount"
                    className="
                                no-spinner
                                w-full  text-sm focus:outline-none outline-none p-2 focus:ring-1 focus:ring-blue-500  border-[silver] border-1 rounded-md"
                    id="w_amount" type="number" min={100} max={15000} placeholder="0.00" />
                <div>
                    <p>Saldo:</p>
                    <select className="outline-none text-[15px] w-full p-2 ring ring-[silver] rounded-md bg-white text-gray-800" name="balance_type" id="">
                        <option value="mpesa_emola">M-PESA/E-EMOLA: {balances.mpesa_emola} MT</option>
                        <option value="paypal">PAYPAL: {balances.paypal} MT</option>
                    </select>
                    {/* 
                    <input type="radio" name="balance_type" id="" />
                        <Image src={mpesa} alt="mpesa" className="rounded-lg h-10 w-10" />
                    <input type="radio" name="balance_type" id="" /> */}

                    {/* <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="balance_type" value="mpesa" className="hidden peer" />
                        <Image
                            src={mpesa}
                            alt="mpesa"
                            className="rounded-lg h-10 w-10 border-2 border-transparent peer-checked:border-blue-500"
                        />
                    </label> */}


                </div>
                <p>Carterira: </p>

                {payouts_wallets?.length || 0 > 0 ? (
                    <select className="outline-none text-[15px] w-full p-2 ring ring-[silver]  rounded-md bg-white text-gray-800" name="wallet_id" id="wallet" required>
                        {payouts_wallets.map((payout, index) => (
                            <option key={index} value={payout.methodid}>
                                {payout.method_type} - {payout.account_id} -  {payout.account_holder}
                            </option>
                        ))}
                    </select>

                )
                    :
                    (
                        <p className="text-[13px] font-[600] text-center" >Nenhum metodo de Pagamento definido</p>
                    )
                }


                <p className="text-[11px] mt-3" >
                    Após a confirmação, será impossível reverter esta ação
                </p>
                <div className="flex justify-end p-4 px-1 gap-3" >
                    <button onClick={() => setShowPopUp(false)}
                        className="rounded-md bg-neutral-100 hover:bg-neutral-200 text-[13px] px-4 py-2 shadow" >Cancelar</button>

                    <button
                        disabled={is_request}
                        type="submit"
                        className={`rounded-md bg-blue-500 hover:bg-blue-600 text-[13px] px-4 py-2
                            text-white ${is_request ? 'opacity-45' : 'opacity-100'}`}
                    >Confirmar</button>
                </div>
            </div>
        </form >
    )
}





export default function WithdrawPopUp({ balances, payouts_wallets }) {
    const [show_popup, setShowPopUp] = useState(false);
    const [mensage, setMensage] = useState('');

    const responseRequest = (msg) => {
        setMensage(msg);
    };

    return (
        <div>
            <button
                onClick={() => setShowPopUp(!show_popup)}
                type="button" className=" w-full max-w-40 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 text-[12px]">Solicitar saque</button>


            <AnimatePresence>
                {show_popup && (
                    <div className="fixed bg-black/40 left-0 right-0 top-0 bottom-0 flex gap-5 justify-center items-center ease-in-out transition-all duration-200 " >

                        <motion.div
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -50 }}
                            transition={{ duration: 0.2 }}
                            className="z-100 opacity-100 bg-white p-3 text-black rounded-md w-100"
                        >

                            <div className="flex justify-between" >
                                <p>Solicitar saque</p>
                                <i onClick={() => setShowPopUp(false)} class="bi bi-x-lg"></i>
                            </div>
                            <p className="text-green-600 font-[600]" >{mensage}</p>
                            <hr className="text-[silver] my-3" />
                            <Form responseRequest={responseRequest} balances={balances} setShowPopUp={setShowPopUp} payouts_wallets={payouts_wallets} />
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    )
}