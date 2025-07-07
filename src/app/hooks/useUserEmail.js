'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

export default function useUserEmail() {
    const router = useRouter();
    const [email, setEmail] = useState(null);

    useEffect(() => {
        async function verifyToken(token) {
         
            if (!token) {
                router.push('/auth/login');
                return false;
            }

            try {

                const response = await axios.post('https://mozbuyit30.vercel.app/api/auth/validate',
                    {
                        token,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

              
                if (response.status === 200 && response.data?.valid === true) {
                    return true;
                } else {
                    console.error('Token inválido ou expirado');
                    return false;
                }

            } catch (error) {
                console.error('Erro ao verificar token:', error?.response?.data || error.message);
                return false;
            }
        }

        const fetchUserId = async () => {
            const token = localStorage.getItem('sessionToken');


            if (!token) {
                router.push('/auth/login');
                return;
            }

            const isValid = await verifyToken(token);
            

            if (!isValid) {
                console.log('Token inválido ou expirado');
                localStorage.removeItem('sessionToken');
                router.push('/auth/login');
            } else {
                const decoded = jwtDecode(token);
                setEmail(decoded.email);

            }
        };

        fetchUserId();
    }, [router]);

    return email;
}
