'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from './AuthContext';

export default function Header() {
  const { isLoggedIn, login, logout } = useAuth();

  const handleAuthAction = () => {
    if (isLoggedIn) {
      logout();
    } else {
      login();
    }
  };

  return (
    <header className="header">
      <div className="logo">
        <Image src="/logo.png" alt="UGA Job Finder Logo" width={50} height={70} />
        <h1>UGA Job Finder</h1>
      </div>
      <nav className="nav">
        <Link href="/">Home</Link>
        <Link href="/splash">Splash</Link>
        <Link href="/items">Jobs</Link>
        {isLoggedIn ? (
          <>
            <Link href="/items/add">Add Job</Link>
            <button onClick={handleAuthAction}>Logout</button>
          </>
        ) : (
          <button onClick={handleAuthAction}>Login / Signup</button>
        )}
      </nav>
      <style jsx>{`
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 2rem;
          background-color: #f5f5f5;
        }
        .logo {
          display: flex;
          align-items: center;
        }
        .logo h1 {
          margin-left: 0.75rem;
          font-size: 1.5rem;
          color: #ba0c2f;
        }
        .nav {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }
        .nav :global(a) {
          font-size: 1.1rem;
          color: #333;
          padding: 0.5rem 1rem;
          transition: color 0.3s ease;
          text-decoration: none;
        }
        .nav :global(a:hover) {
          color: #ba0c2f;
        }
        button {
          padding: 0.5rem 1rem;
          font-size: 1rem;
          background-color: transparent;
          border: 2px solid #ba0c2f;
          border-radius: 4px;
          color: #ba0c2f;
          cursor: pointer;
          transition: background-color 0.3s ease, color 0.3s ease;
        }
        button:hover {
          background-color: #ba0c2f;
          color: #fff;
        }
      `}</style>
    </header>
  );
}
