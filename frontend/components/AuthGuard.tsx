'use client'; // Must be client-side to check localStorage

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // 1. Check if the token exists in local storage
    const token = localStorage.getItem('access_token');

    if (!token) {
      // 2. If no token, redirect to login
      // We use 'replace' so they can't go 'back' to the protected page
      router.replace('/login');
    } else {
      // 3. If token exists, allow access
      setAuthorized(true);
    }
  }, [router]);

  // 4. While checking, show nothing (or a loading spinner)
  if (!authorized) {
    return null; 
  }

  // 5. If authorized, render the protected page content
  return <>{children}</>;
}