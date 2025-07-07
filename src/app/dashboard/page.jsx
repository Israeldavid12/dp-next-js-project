'use client'
import React from 'react';
import axios from "axios";
import Image from 'next/image';
import BanerImage from '../../../public/images/baner.png';
import dashStayles from './dashboard.module.css'
import LastSale from './_components/Lastsale'
import SalesChart from './_components/SalesChart'
import FinancesStatus from './_components/FinancesStatus'
import { Suspense, useEffect, useState } from 'react';
import { Loading } from './_components/LoadindAnim'







function DasboardPage() {
  const [user, setUserData] = useState(null)
  const [sales, setSalesData] = useState(null)
  const [banner, setBanner] = useState(true)
  const [summary, setSumary] = useState(null)
  const token = localStorage.getItem('sessionToken')


  useEffect(() => {
    const fetchData = async () => {
      try {
        const summaryReq = axios.get("http://localhost:4000/api/user/summary-status", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const userReq = axios.get("http://localhost:4000/api/user/personal/data", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const salesReq = axios.get("http://localhost:4000/api/user/sales", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const [summaryRes, userRes, salesRes] = await Promise.all([
          summaryReq,
          userReq,
          salesReq
        ]);


        setSumary(summaryRes.data?.balances);
        setUserData(userRes.data?.user);       
        setSalesData(salesRes.data?.sales);     

      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, []);



  if (!user) return <Loading />

  return (
    <>
      <div className={dashStayles.dashboard} >
        {user && (<h1 className='justify-self-start text-[20px] ' >Olá, <strong>{user?.name}</strong> </h1>)}
        <div className='relative' >
          <i className={`shadow-lg bi bi-x-circle-fill text-lg text-red-700 -translate-3  z-100 absolute ${banner ? '' : 'hidden'} `} onClick={() => setBanner(false)} ></i>
          <Image src={BanerImage} alt='banner' className={`z-0 ${banner ? '' : 'hidden'}`} />
        </div>
        <Suspense fallback={<Loading />} >
          <FinancesStatus summary={summary} />
        </Suspense>

        <Suspense fallback={<Loading />} >
          {sales && (<LastSale lastSale={sales[sales.length - 1]} />)}
        </Suspense>

        <SalesChart sales={sales} />

      </div>
    </>

  );

}


export default DasboardPage;
