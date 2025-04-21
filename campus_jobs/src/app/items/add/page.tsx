// app/items/add/page.tsx
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddItemPage() {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [company, setCompany] = useState('');

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/jobs/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          image: image,
          company,
        }),
      });

      if (!res.ok) throw new Error('Failed to add job');

      // Clear the form fields
      setTitle('');
      setImage('');
      setCompany('');
      // Redirect to job listings
      router.push('/items');
    } catch (err) {
      console.error('Error adding job:', err);
      alert('Failed to add job');
    }
  };

  return (
    <div className="add-item">
      <h2>Add New Job</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Job Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Company:</label>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
          /> 
        </div>
        <button type="submit">Add Job</button>
      </form>
      <style jsx>{`
        .add-item {
          padding: 2rem;
        }
        form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          max-width: 400px;
          margin: 0 auto;
        }
        label {
          font-weight: bold;
        }
        input {
          padding: 0.5rem;
          border: 1px solid #ccc;
        }
        button {
          padding: 0.5rem;
          background-color: #0070f3;
          color: white;
          border: none;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
