'use client'
import { useSearchParams, redirect } from "next/navigation";
import { Loading } from '../../../_components/LoadindAnim'
import { useState, useEffect } from 'react'
import axios from 'axios'
import useUserId from "../../../../hooks/useUserId";
const apiUrl = process.env.NEXT_PUBLIC_BASE_API_URL;


export default function DelelePayout() {
    const [response, setResponse] = useState(null)
    const searchParams = useSearchParams()
    const id = searchParams.get('id')
    const userId = useUserId()

    useEffect(() => {
        console.log(id)
        async function handleDelete() {
            const token = localStorage.getItem('sessionToken')
            try {
                const req = await axios.post(apiUrl + '/api/payouts-methods/delete', {
                    id: id
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setResponse(req?.data?.message)
                setTimeout(() => {
                    redirect("/dashboard/profile")
                }, 3000)

            } catch (e) {
                console.log(e)
                setResponse(e.message)
                setTimeout(() => {
                    redirect("/dashboard/profile")
                }, 2000)
            }
        }
        handleDelete()
    }, [userId])

    if (!response) return <Loading />

    return (
        <div>
            {response && (
                <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                    {response}
                </div>
            )}
        </div>
    )
}