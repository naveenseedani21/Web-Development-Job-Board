// app/page.tsx
'use client'; // Mark this file as a Client Component

export default function Home() {
  return (
    <div className="home">
      <h2>Welcome to UGA Job Finder</h2>
      <p>
        Discover the latest opportunities directly from the official UGA website.
        Whether you&apos;re browsing available jobs or tailoring your resume to fit a position,
        we are here to help.
      </p>
      <style jsx>{`
        .home {
          text-align: center;
          padding: 2rem;
        }
      `}</style>
    </div>
  );
}
