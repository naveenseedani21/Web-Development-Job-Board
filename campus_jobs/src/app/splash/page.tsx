// app/splash/page.tsx
'use client'; // Mark as a Client Component

import Image from 'next/image';

export default function Splash() {
  return (
    <div className="splash">
      <Image
        src="/splash-image.jpg"
        alt="Splash Image"
        width={800}
        height={400}
      />
      <h2>Welcome to UGA Job Finder</h2>
      <p>Your gateway to finding your dream job at UGA.</p>
      <style jsx>{`
        .splash {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }
        h2 {
          margin-top: 1rem;
        }
      `}</style>
    </div>
  );
}
