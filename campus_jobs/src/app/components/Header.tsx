'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('Header auth check:', token);
    setIsLoggedIn(!!token);
  }, [pathname]);

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
            <button
              onClick={() => {
                localStorage.removeItem('token');
                location.reload();
              }}
              className="btn secondary"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login">Login</Link>
            <Link href="/signup">Signup</Link>
          </>
        )}
      </nav>

      <style jsx>{`
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 2rem;
          background-color: #f5f5f5;
          font-family: inherit;
        }
        .logo-link {
          display: flex;
          align-items: center;
          text-decoration: none;
          font-family: inherit;
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
          font: inherit;
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
