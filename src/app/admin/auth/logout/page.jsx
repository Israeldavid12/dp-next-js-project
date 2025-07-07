'use client'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';


const LogoutAdmin = () => {
    const router = useRouter();

    useEffect(() => {
        localStorage.removeItem('sessionToken');
        router.push('/admin/auth/login');
    }, [router]);

    return (
        <div>
            <p>Logging out...</p>
        </div>
    );

}

export default LogoutAdmin;