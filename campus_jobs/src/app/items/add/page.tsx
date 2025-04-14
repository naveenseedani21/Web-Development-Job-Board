// app/items/add/page.tsx
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddItemPage() {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('New Job:', { title, image });
    // Clear the form fields
    setTitle('');
    setImage('');
    // Redirect to job listings
    router.push('/items');
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
