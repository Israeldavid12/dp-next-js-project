'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function LogoutPage() {
  const router = useRouter()

  useEffect(() => {
    // Garante que está no navegador
    if (typeof window !== 'undefined') {
      localStorage.removeItem('sessionToken')
      router.push('/auth/login')
    }
  }, [])

  return <p>Redirecionando...</p>
}
