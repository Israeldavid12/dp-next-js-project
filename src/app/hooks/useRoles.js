'use client';
import { useEffect, useState } from "react";
import { useRouter, usePathname } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';



export default function useRoles() {
    const [roles, setRoles] = useState()
    const router = useRouter()
   


    useEffect(() => {
        const sessiontoken = localStorage.getItem('sessionToken')
        if (!sessiontoken) {
            router.replace('/auth/login')
            return
        }

        try {
            const decoded = jwtDecode(sessiontoken)
            if (!decoded?.admin) {
                router.replace('/acess_dinied')
                return
            }

            setRoles(decoded)

        } catch (e) {
            console.log(e)
        }

    }, [])

    return roles
}