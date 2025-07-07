'use client'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';


export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem('sessionToken');
    router.push('/auth/login');
  }, [router]);

  return null;

}