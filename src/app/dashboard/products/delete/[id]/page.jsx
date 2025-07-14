'use client'
import { useParams, redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Loading } from '../../../_components/LoadindAnim';
const apiUrl = process.env.NEXT_PUBLIC_BASE_API_URL;



export default function DeleleProduct() {
    const [response, setResponse] = useState(null)
    const id = useParams().id;
    const token = localStorage.getItem('sessionToken')

    useEffect(() => {
       const handleDelele = async () => {
            try {
                const req = await axios.post(apiUrl+'/api/products/delete', { id }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (req?.data) {
                    setResponse(req?.data?.message)
                    setTimeout(() => {
                        redirect('/dashboard/products')
                    }, 1500);
                }

            } catch (e) {
                console.log(e)
                setResponse(e.message)
                setTimeout(() => {
                    redirect('/dashboard/products')
                }, 1500);
            }
        }
        if (token) {
            handleDelele()
        }

    }, [token]);

    if (!response) return <Loading />

    return (
        <div>
            {response && (
                <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    {response}
                </div>
            )}
        </div>
    )
}