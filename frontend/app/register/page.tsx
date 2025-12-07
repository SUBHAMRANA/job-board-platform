'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'seeker', // Default role
  });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      // 1. Send data to the UserViewSet (create endpoint)
      const res = await fetch('http://127.0.0.1:8000/api/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert('Registration Successful! Please login.');
        router.push('/login');
      } else {
        // Helper to show readable errors from Django
        const data = await res.json();
        setError(JSON.stringify(data));
      }
    } catch (err) {
      setError('Something went wrong.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px' }}>
      <h1>Sign Up</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input
          name="username"
          type="text"
          placeholder="Username"
          onChange={handleChange}
          required
          style={{ padding: '10px' }}
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
          style={{ padding: '10px' }}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
          style={{ padding: '10px' }}
        />
        
        {/* Role Selection */}
        <select 
          name="role" 
          onChange={handleChange} 
          value={formData.role}
          style={{ padding: '10px' }}
        >
          <option value="seeker">Job Seeker</option>
          <option value="recruiter">Recruiter</option>
        </select>

        <button type="submit" style={{ padding: '10px', background: '#0070f3', color: 'white', border: 'none' }}>
          Register
        </button>
      </form>
    </div>
  );
}