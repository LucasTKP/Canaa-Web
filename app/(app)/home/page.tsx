'use client'
import { UserContext } from '@/context/userContext';
import { auth } from '@/lib/firebase_config';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react'

export default function Page() {
  const router = useRouter()
  const {user, setUser} = useContext(UserContext);

  return (
    <>
      <div onClick={() => signOut(auth)}>Page</div>
      {user?.isAdmin && <div onClick={() => router.push('/admin')}>Admin</div>}
    </>
  );
}
