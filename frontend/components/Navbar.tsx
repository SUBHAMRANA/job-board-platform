'use client';

import Link from 'next/link';
import { useAuth } from '../context/AuthContext'; // Import the hook

export default function Navbar() {
  // Get user and logout function directly from our new Context
  // The 'user' variable will automatically update when login/logout happens!
  const context = useAuth();
  const user = context?.user;
  const logout = context?.logout;

  return (
    <nav style={{ padding: '20px', borderBottom: '1px solid #ddd', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
        <Link href="/">JobBoard</Link>
      </div>

      <div style={{ display: 'flex', gap: '20px' }}>
        <Link href="/">Jobs</Link>
        
        {user ? (
          <>
            <Link href="/post-job">Post Job</Link>
            <button 
              onClick={logout}
              style={{ background: 'none', border: 'none', color: 'red', cursor: 'pointer', fontSize: '1rem' }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}