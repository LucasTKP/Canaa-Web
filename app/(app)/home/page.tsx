'use client'
import { auth } from '@/lib/firebase_config';
import React, { useEffect } from 'react'

export default function Page() {
  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      console.log(user);
    }
  }, []);
  return (
    <div>Page</div>
  )
}
