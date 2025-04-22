'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname(); // watches for route changes

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, [pathname]); // re-run on every page change

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    window.location.href = '/'; 
  };

  return (
    <header className="header">
      <Link href="/" className="logo-link">
        <div className="logo">
          <Image
            src="/logo.png"
            alt="UGA Job Finder Logo"
            width={50}
            height={70}
          />
          <h1>UGA Job Finder</h1>
        </div>
      </Link>

      <nav className="nav">
        <Link href="/items">Jobs</Link>

        {isLoggedIn ? (
          <>
            <Link href="/items/add">Add Job</Link>
            <button onClick={handleLogout} className="btn secondary">
              Logout
            </button>
          </>
        ) : (
          <Link href="/login">Login / Signup</Link>
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
        .logo-link {
          display: flex;
          align-items: center;
          text-decoration: none;
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
        .nav :global(a),
        .nav button {
          font-size: 1.1rem;
          color: #333;
          padding: 0.5rem 1rem;
          background: none;
          border: none;
          cursor: pointer;
          text-decoration: none;
        }
        .nav :global(a:hover),
        .nav button:hover {
          color: #ba0c2f;
        }
      `}</style>
    </header>
  );
}
