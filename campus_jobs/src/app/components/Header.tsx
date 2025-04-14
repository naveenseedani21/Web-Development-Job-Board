// components/Header.tsx
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
        <Image src="/logo.png" alt="UGA Job Finder Logo" width={50} height={50} />
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
          padding: 1rem;
          background-color: #f5f5f5;
        }
        .logo {
          display: flex;
          align-items: center;
        }
        .logo h1 {
          margin-left: 0.5rem;
        }
        .nav a {
          margin-right: 1rem;
        }
        button {
          padding: 0.5rem 1rem;
          cursor: pointer;
          background-color: #0070f3;
          color: white;
          border: none;
          border-radius: 4px;
        }
      `}</style>
    </header>
  );
}
