// src/app/page.tsx
'use client'; // this page uses client‑side hooks

import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function Home() {
  const { user, error, isLoading } = useUser();

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to UGA Job Finder</h1>
          <p>
            Your career journey begins here. Discover exclusive job opportunities and tailor your resume
            with cutting‑edge tools built for the UGA community.
          </p>
          <div className="cta">
            <Link
              href="/items"
              className="btn primary"
              onMouseUp={(e) => e.currentTarget.blur()}
            >
              Browse Jobs
            </Link>

            {user ? (
              <Link
                href="/splash"
                className="btn secondary"
                onMouseUp={(e) => e.currentTarget.blur()}
              >
                Upload Resume
              </Link>
            ) : (
              <>
                <button
                  className="btn secondary disabled"
                  disabled
                >
                  Upload Resume
                </button>
                <p className="auth-note">
                  Please sign in / log in to use this functionality.
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Why Choose UGA Job Finder?</h2>
        <div className="feature-cards">
          <div className="card">
            <h3>Official UGA Listings</h3>
            <p>
              Access authentic job postings directly from UGA resources and partner organizations.
            </p>
          </div>
          <div className="card">
            <h3>Tailored Opportunities</h3>
            <p>
              Receive personalized job recommendations based on your resume and skill set.
            </p>
          </div>
          <div className="card">
            <h3>Community & Networking</h3>
            <p>
              Connect with fellow Bulldogs and expand your professional network effortlessly.
            </p>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="resources">
        <h2>Resources</h2>
        <div className="resource-grid">
          <a
            href="https://www.joinhandshake.com"
            target="_blank"
            rel="noopener noreferrer"
            className="resource-card"
          >
            <img
              src="/handshake.png"
              alt="Handshake"
              width="250"
              height="150"
              style={{ objectFit: 'cover' }}
            />
            <h3>Handshake</h3>
            <p>Explore UGA's official job platform.</p>
          </a>
          <a
            href="https://career.uga.edu/calendar"
            target="_blank"
            rel="noopener noreferrer"
            className="resource-card"
          >
            <img
              src="/jobs.jpg"
              alt="UGA Job Events"
              width="250"
              height="150"
              style={{ objectFit: 'cover' }}
            />
            <h3>UGA Job Events</h3>
            <p>Discover upcoming career and networking events.</p>
          </a>
          <a
            href="https://career.uga.edu/"
            target="_blank"
            rel="noopener noreferrer"
            className="resource-card"
          >
            <img
              src="/center.jpg"
              alt="UGA Careers"
              width="250"
              height="150"
              style={{ objectFit: 'cover' }}
            />
            <h3>UGA Careers</h3>
            <p>Access career resources and advice for your future.</p>
          </a>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <h2>What Our Users Say</h2>
        <div className="testimonial-cards">
          <div className="testimonial">
            <p>
              "UGA Job Finder completely changed my career! The tailored recommendations are spot on."
            </p>
            <span>- Bianca, Alum</span>
          </div>
          <div className="testimonial">
            <p>
              "I found the perfect opportunity through UGA Job Finder. It’s a must for every Bulldog!"
            </p>
            <span>- Naveen, Student</span>
          </div>
          <div className="testimonial">
            <p>
              "This website is honestly so helpful, it is so nice to have every resource in the same place"
            </p>
            <span>- Shay, Student</span>
          </div>
          <div className="testimonial">
            <p>
              "I don't know how this is a free tool, I'd sell my kidney for this"
            </p>
            <span>- Pratham, Student</span>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="call-to-action">
        <h2>Ready to Take the Next Step?</h2>
        <p>Join our community and let UGA Job Finder propel your career forward.</p>
        <a
          href="/api/auth/login?screen_hint=signup"
          className="btn primary"
          onMouseUp={(e) => e.currentTarget.blur()}
        >
          Get Started Now
        </a>
      </section>

      {/* GLOBAL styles so the disabled state and auth-note are scoped */}
      <style jsx global>{`
        .home {
          display: flex;
          flex-direction: column;
          gap: 4rem;
          background: #fff;
          color: #1e1e1e;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
            Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }
        .hero {
          position: relative;
          text-align: center;
          color: #fff;
          padding: 5rem 2rem;
          background: linear-gradient(rgba(186,12,47,0.15), rgba(186,12,47,0.15)),
            url('/hero-bg.jpg') center/cover no-repeat;
        }
        .hero-content {
          max-width: 800px;
          margin: 0 auto;
        }
        .hero h1 {
          font-size: 3rem;
          margin-bottom: 1rem;
          color: #ba0c2f;
        }
        .hero p {
          font-size: 1.2rem;
          line-height: 1.5;
          margin-bottom: 2rem;
        }
        .cta {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }

        /* BUTTON STYLES GLOBAL */
        .btn {
          padding: 0.75rem 1.5rem;
          font-size: 1rem;
          border: none;
          cursor: pointer;
          border-radius: 4px;
          text-decoration: none;
          transition: background 0.3s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .btn.primary {
          background-color: #ba0c2f;
          color: #fff;
        }
        .btn.primary:hover {
          background-color: #a50c29;
        }
        .btn.secondary {
          background-color: transparent;
          border: 2px solid #ba0c2f;
          color: #ba0c2f;
        }
        .btn.secondary:hover {
          background-color: #ba0c2f;
          color: #fff;
        }

        /* disabled Upload Resume */
        .btn.secondary.disabled {
          background-color: #e0e0e0;
          border-color: #e0e0e0;
          color: #888;
          cursor: not-allowed;
        }

        /* note under disabled button */
        .auth-note {
          margin-top: 0.25rem;
          font-size: 0.9rem;
          color: #666;
          text-align: center;
        }

        .btn:focus {
          outline: none;
          box-shadow: none;
        }
        .features {
          padding: 2rem;
          text-align: center;
        }
        .features h2 {
          font-size: 2.5rem;
          margin-bottom: 2rem;
          color: #ba0c2f;
        }
        .feature-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        .card {
          background: #f9f9f9;
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 1.5rem;
          transition: transform 0.3s ease;
        }
        .card:hover {
          transform: translateY(-5px);
        }
        .card h3 {
          margin-bottom: 1rem;
          color: #ba0c2f;
        }
        .card p {
          font-size: 1rem;
          line-height: 1.4;
        }
        .resources {
          padding: 2rem;
          text-align: center;
          background: linear-gradient(135deg, #ba0c2f, #1e1e1e);
        }
        .resources h2 {
          font-size: 2.5rem;
          margin-bottom: 2rem;
          color: #f9f9f9;
        }
        .resource-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        .resource-card {
          background: #f9f9f9;
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 1.5rem;
          text-decoration: none;
          color: inherit;
          transition: transform 0.3s ease;
        }
        .resource-card:hover {
          transform: translateY(-5px);
        }
        .resource-card img {
          width: 100%;
          height: 150px;
          object-fit: cover;
          border-radius: 4px;
          margin-bottom: 1rem;
        }
        .resource-card h3 {
          margin: 0.5rem 0;
          color: #ba0c2f;
        }
        .resource-card p {
          font-size: 0.95rem;
          line-height: 1.4;
        }
        .testimonials {
          background: #f3f3f3;
          padding: 2rem;
          text-align: center;
        }
        .testimonials h2 {
          font-size: 2rem;
          color: #ba0c2f;
          margin-bottom: 2rem;
        }
        .testimonial-cards {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          max-width: 800px;
          margin: 0 auto;
        }
        .testimonial {
          background: #fff;
          padding: 1rem;
          border-left: 4px solid #ba0c2f;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        .testimonial p {
          font-style: italic;
          margin-bottom: 0.5rem;
        }
        .testimonial span {
          display: block;
          font-weight: bold;
          color: #1e1e1e;
        }
        .call-to-action {
          text-align: center;
          padding: 3rem 2rem;
          background: linear-gradient(90deg, #ba0c2f 0%, #1e1e1e 100%);
          color: #fff;
        }
        .call-to-action h2 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }
        .call-to-action p {
          font-size: 1.2rem;
          margin-bottom: 2rem;
        }
        @media (max-width: 768px) {
          .hero h1 {
            font-size: 2.5rem;
          }
          .features h2,
          .call-to-action h2,
          .resources h2 {
            font-size: 2rem;
          }
          .hero p,
          .features p,
          .resource-card p {
            font-size: 1rem;
          }
          .cta {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}
