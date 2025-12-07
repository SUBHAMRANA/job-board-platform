'use client';

import AuthGuard from '../../components/AuthGuard';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PostJobPage() {
  const router = useRouter();
  
  // Form State
  const [formData, setFormData] = useState({
    title: '',
    company_name: '',
    location: '',
    description: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 1. Get the token (Your "ID Card")
    const token = localStorage.getItem('access_token');

    try {
      const res = await fetch('http://127.0.0.1:8000/api/jobs/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 2. Attach the token to the request
          'Authorization': `Bearer ${token}`, 
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert('Job Posted Successfully! It will appear after Admin approval.');
        router.push('/');
      } else {
        const data = await res.json();
        setError(JSON.stringify(data));
      }
    } catch (err) {
      setError('Something went wrong.');
    }
  };

  return (
    <AuthGuard>
      <div style={{ maxWidth: '600px', margin: '50px auto', padding: '20px' }}>
        <h1>Post a New Job</h1>
        
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          
          <input
            name="title"
            placeholder="Job Title (e.g. Senior React Dev)"
            onChange={handleChange}
            required
            style={{ padding: '10px' }}
          />

          <input
            name="company_name"
            placeholder="Company Name"
            onChange={handleChange}
            required
            style={{ padding: '10px' }}
          />

          <input
            name="location"
            placeholder="Location (e.g. Remote, NY)"
            onChange={handleChange}
            required
            style={{ padding: '10px' }}
          />

          <textarea
            name="description"
            placeholder="Job Description..."
            rows={5}
            onChange={handleChange}
            required
            style={{ padding: '10px' }}
          />

          <button type="submit" style={{ padding: '12px', background: 'green', color: 'white', border: 'none', cursor: 'pointer' }}>
            Submit Job for Approval
          </button>
        </form>
      </div>
    </AuthGuard>
  );
}