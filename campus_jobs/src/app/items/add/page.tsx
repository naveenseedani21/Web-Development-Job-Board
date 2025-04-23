'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function AddItemPage() {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [company, setCompany] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const defaultImage = '/default-image1.jpeg';
    try {
      const res = await fetch('/api/jobs/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          title, 
          image: image || defaultImage,
          company, 
        }),
      });
      if (!res.ok) throw new Error('Failed to add job');
      setTitle('');
      setImage('');
      setCompany('');
      router.push('/items');
    } catch (err) {
      console.error('Error adding job:', err);
      alert('Unable to add job. Please try again.');
    }
  };

  return (
    <div className="add-item-container">
      <div className="card">
        <h2>Add New Job Listing</h2>
        <form onSubmit={handleSubmit} className="add-form">
          <div className="field-group">
            <label htmlFor="title">Job Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Senior Backend Engineer"
              required
            />
          </div>
          <div className="field-group">
            <label htmlFor="image">Image URL</label>
            <input
              id="image"
              type="url"
              value={image}
              onChange={e => setImage(e.target.value)}
              placeholder="https://example.com/logo.png"
            />
          </div>
          <div className="field-group">
            <label htmlFor="company">Company</label>
            <input
              id="company"
              type="text"
              value={company}
              onChange={e => setCompany(e.target.value)}
              placeholder="e.g. Acme Corp"
              required
            />
          </div>
          <button type="submit" className="btn-submit">Add Job</button>
        </form>
      </div>

      <style jsx>{`
        .add-item-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: calc(100vh - 80px);
          padding: 2rem;
          background: #f9f9f9;
        }
        .card {
          background: #ffffff;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          max-width: 480px;
          width: 100%;
        }
        .card h2 {
          margin-bottom: 1.5rem;
          color: #333333;
          font-size: 1.75rem;
          text-align: center;
        }
        .add-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .field-group {
          display: flex;
          flex-direction: column;
        }
        .field-group label {
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: #555555;
        }
        .field-group input {
          padding: 0.75rem;
          border: 1px solid #dddddd;
          border-radius: 4px;
          font-size: 1rem;
          transition: border-color 0.2s;
        }
        .field-group input:focus {
          outline: none;
          border-color: #ba0c2f;
        }
        .btn-submit {
          margin-top: 1rem;
          padding: 0.75rem;
          background-color: #ba0c2f;
          color: #ffffff;
          border: none;
          border-radius: 4px;
          font-size: 1rem;
          cursor: pointer;
          transition: background 0.3s ease;
        }
        .btn-submit:hover {
          background-color: #a50c29;
        }
      `}</style>
    </div>
  );
}