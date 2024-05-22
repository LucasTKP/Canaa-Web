'use client'
import { UserContext } from '@/context/userContext'
import { useRouter } from 'next/navigation'
import React, { useContext, useEffect } from 'react'

export default function Page() {
    const {user} = useContext(UserContext)
    const router = useRouter()

    useEffect(() => {
      if(user?.isAdmin === false) router.push('/home')
    }, [router, user]);

  return (
    <div>page</div>
  )
}
