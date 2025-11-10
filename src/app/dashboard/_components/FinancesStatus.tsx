'use client'
import { Withdraw } from '../_components/Buttons';
import axios from 'axios';
import { useEffect, useState, useRef, use } from 'react';
import { Loading } from './LoadindAnim';
import emolaIcon from '../../../../public/images/emola.png';
import MpesaIcon from '../../../../public/images/mpesa.png';
import PaypalIcon from '../../../../public/images/paypal.png'
import Image from 'next/image';
import { formatCurrency } from '@/app/lib/utils';
import { useRouter } from 'next/navigation';


export default function FinancesStatus({ summary }) {
    const [isActive, setIsActive] = useState(false);
    const [isActive2, setIsActive2] = useState(false)
    const saldo1Ref = useRef(null)
    const saldo2Ref = useRef(null)
    const router = useRouter();
  

    const toggleSaldo = (state, type) => {
        saldo1Ref.current.style.transition = 'opacity 0.3s ease, filter 0.3s ease';

        if (type === 'saldo1') {
            if (!state) {
                saldo1Ref.current.style.filter = 'blur(5px)';
            } else {
                saldo1Ref.current.style.filter = 'blur(0px)';
            }
        } else {
            if (!state) {
                saldo2Ref.current.style.filter = 'blur(5px)';
            } else {
                saldo2Ref.current.style.filter = 'blur(0px)';
            }

        }
    };



    const toggleClass = (type) => {
        if (type === 1) {
            setIsActive(!isActive);
        } else {
            setIsActive2(!isActive2)
        }

    };




    return (
        <>
            <div className='grid sm:flex  gap-3 w-full' >
                <div className='grid sm:flex sm:justify-between gap-3 w-full '  >
                    <div className='grid bg-[#ffffff] gap-8 p-6 w-full  shadow-sm rounded-md '  >
                        <div className='flex gap-2' >
                            <p>Saldo disponivel</p>
                            <Image className='w-8 h-8 rounded-sm' src={emolaIcon} alt='EmolaIcon' />
                            <Image className='w-8 h-8 rounded-sm' src={MpesaIcon} alt='mpesaicone' />
                        </div>

                        {summary?.mpesa_emola !== undefined ? (
                            <p className='text-[20px] text-green-700 font-bold'>
                                <span ref={saldo2Ref}>
                                    {formatCurrency(summary?.mpesa_emola)}
                                </span> <i onClick={() => {
                                    toggleClass(2);
                                    toggleSaldo(isActive2, 'saldo2');
                                }} className={isActive2 ? 'bi bi-eye' : 'bi bi-eye-slash'} ></i>
                            </p>
                        ) : (
                            <Loading />
                        )}
                        <Withdraw />
                    </div>
                    <div className='grid gap-8 bg-[#ffffff] p-6 w-full sm:w-[100%]  shadow-sm  rounded-md' >
                        <div className='flex gap-2' >
                            <p>Saldo disponivel</p>
                            <Image className='w-8 h-8 rounded-sm' src={PaypalIcon} alt='mpesaicone' />
                        </div>
                        {summary?.paypal !== undefined ? (
                            <p className='text-[20px] text-green-700 font-bold'>
                                <span ref={saldo1Ref}>
                                    {formatCurrency(summary?.paypal)}
                                </span>  <i onClick={() => {
                                    toggleClass(1);
                                    toggleSaldo(isActive, 'saldo1');
                                }} className={isActive ? 'bi bi-eye' : 'bi bi-eye-slash'} ></i>

                            </p>
                        ) : (
                            <Loading />
                        )}
                        <Withdraw />
                    </div>
                </div>
                <div className='w-full sm:w-[50%] grid gap-3' >
                    <div className='grid gap-2 bg-[#ffffff] shadow-sm rounded-md p-4 ' >
                        <p>Vendas <i className="bi bi-graph-up-arrow text-[18px]"></i></p>
                        <p><strong>{summary?.total_sales}</strong></p>
                    </div>
                    <a href='/dashboard/products/select/'
                        type="button" className="flex justify-center items-center h-20 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"><i className="bi bi-plus"></i> Criar produto</a>

                </div>
            </div>
        </>
    )
}