'use client'
import React, {useState, useEffect} from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import useUserId from '../../hooks/useUserId'
import axios from "axios";


const data = [
  { name: "Jan", vendas: 400 },
  { name: "Fev", vendas: 300 },
  { name: "Mar", vendas: 500 },
  { name: "Abr", vendas: 600 },
  { name: "Mai", vendas: 700 },
  { name: "Jun", vendas: 900 },
];

const SalesChart = () => {
  const [sales, setSales] = useState([])
  const [is_load, setLoad] = useState(true)
  const userId = useUserId()

  useEffect(() => {
    async function handleSales() {
      try {
        const payload = {
          reqType: 'get/sales',
          userId: userId
        } 
        const req = await axios.post('https://monsterbot.vercel.app/api/user', payload)
        console.log(req?.data.sales)
        setSales(req?.data.sales)
        // setBalance(req?.data?.liquid_balance?.total_balance_mpesa_emola)
        // setLoad(false)
      } catch (e) {
        console.log(e)
        // setLoad(false)
      }
    }
    handleSales()
  }, [userId])


  return (
    <div className="w-full mx-auto p-4 bg-white shadow-sm rounded-2xl">
      <h2 className="text-[16px] mb-4 text-start">Vendas <i className="bi bi-graph-up-arrow text-[18px]"></i></h2>
      <div className="h-64 sm:h-72 md:h-96">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={sales}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="amount_paid" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="id" stroke="#3b82f6" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesChart;
