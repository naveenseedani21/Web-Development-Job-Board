'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });
      if (res.status === 201) {
        setMessage('Account created! Redirecting to login...');
        setUsername('');
        setEmail('');
        setPassword('');
        setTimeout(() => router.push('/login'), 2000);
      } else {
        const err = await res.text();
        setMessage(err);
      }
    } catch {
      setMessage('Unexpected error. Please try again.');
    }
  };

  return (
    <main className="signup-hero">
      <div className="hero-content">
        <h1>Join UGA Job Finder</h1>
        <p>Create your account to discover tailored job opportunities.</p>
        <form onSubmit={handleSubmit} className="signup-form">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Your username"
          />

          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a password"
          />

          <button type="submit" className="btn primary">Create Account</button>
          {message && <p className="form-message">{message}</p>}
        </form>
        <p className="auth-note">
          Already have an account? <Link href="/login" className="auth-link">Log in</Link>
        </p>
      </div>

      <style jsx global>{`
        .signup-hero {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background: linear-gradient(135deg, #ba0c2f,rgb(0, 0, 0));
          padding: 2rem;
        }
        .hero-content {
          max-width: 400px;
          background: #fff;
          padding: 2.5rem;
          border-radius: 8px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
          text-align: center;
        }
        .hero-content h1 {
          color: #ba0c2f;
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }
        .hero-content p {
          margin-bottom: 1.5rem;
          color: #555;
          font-size: 1rem;
        }
        .signup-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 1rem;
        }
        .signup-form label {
          font-size: 0.9rem;
          color: #333;
          text-align: left;
        }
        .signup-form input {
          padding: 0.75rem;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 1rem;
        }
        .btn.primary {
          background-color: #ba0c2f;
          color: #fff;
          padding: 0.75rem;
          border: none;
          border-radius: 4px;
          font-size: 1rem;
          cursor: pointer;
          transition: background 0.3s ease;
        }
        .btn.primary:hover {
          background-color: #a50c29;
        }
        .form-message {
          color: #c00;
          font-size: 0.875rem;
        }
        .auth-note {
          font-size: 0.9rem;
          color: #333;
        }
        .auth-link {
          color: #ba0c2f;
          text-decoration: none;
        }
        .auth-link:hover {
          text-decoration: underline;
        }

        @media (max-width: 600px) {
          .hero-content {
            padding: 2rem;
          }
        }
      `}</style>
    </main>
  );
}
