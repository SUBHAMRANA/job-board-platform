'use client';

import { useState } from 'react';
import { useAuth } from '../../context/AuthContext'; // <-- Import context

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  // Use the login function from context
  const { login } = useAuth()!; // The '!' tells TS we know context exists

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://127.0.0.1:8000/api/token/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // USE THE CONTEXT LOGIN FUNCTION
        // This updates the token AND notifies the Navbar instantly
        login(data.access);
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('Something went wrong.');
    }
  };

  // ... (Rest of your JSX return logic is exactly the same)
  return (
     <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px' }}>
      <h1>Login</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {/* ... Inputs remain the same ... */}
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} style={{ padding: '10px' }} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ padding: '10px' }} required />
        <button type="submit" style={{ padding: '10px', backgroundColor: '#0070f3', color: 'white', border: 'none' }}>Login</button>
      </form>
    </div>
  );
}