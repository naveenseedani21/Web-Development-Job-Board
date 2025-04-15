'use client'; // Enable client-side features and styled-jsx

export default function Home() {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to UGA Job Finder</h1>
          <p>
            Your career journey begins here. Discover exclusive job opportunities and tailor your
            resume with cutting-edge tools built for the UGA community.
          </p>
          <div className="cta">
            <button className="btn primary">Browse Jobs</button>
            <button className="btn secondary">Upload Resume</button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Why Choose UGA Job Finder?</h2>
        <div className="feature-cards">
          <div className="card">
            <h3>Official UGA Listings</h3>
            <p>Access authentic job postings directly from UGA resources and partner organizations.</p>
          </div>
          <div className="card">
            <h3>Tailored Opportunities</h3>
            <p>Receive personalized job recommendations based on your resume and skill set.</p>
          </div>
          <div className="card">
            <h3>Community & Networking</h3>
            <p>Connect with fellow Bulldogs and expand your professional network effortlessly.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <h2>What Our Users Say</h2>
        <div className="testimonial-cards">
          <div className="testimonial">
            <p>"UGA Job Finder completely changed my career! The tailored recommendations are spot on."</p>
            <span>- Bianca, Alum</span>
          </div>
          <div className="testimonial">
            <p>"I found the perfect opportunity through UGA Job Finder. It’s a must for every Bulldog!"</p>
            <span>- Naveen, Student</span>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="call-to-action">
        <h2>Ready to Take the Next Step?</h2>
        <p>Join our community and let UGA Job Finder propel your career forward.</p>
        <button className="btn primary">Get Started Now</button>
      </section>

      <style jsx>{`
        /* Overall Page Container */
        .home {
          display: flex;
          flex-direction: column;
          gap: 4rem;
          background: #fff;
          color: #1e1e1e;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
            Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }

        /* Hero Section */
        .hero {
          position: relative;
          text-align: center;
          color: #fff;
          padding: 5rem 2rem;
          background: linear-gradient(rgba(186, 12, 47, 0.15), rgba(186, 12, 47, 0.15)),
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
          justify-content: center;
          gap: 1rem;
        }
        .btn {
          padding: 0.75rem 1.5rem;
          font-size: 1rem;
          border: none;
          cursor: pointer;
          border-radius: 4px;
          transition: background 0.3s ease;
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

        /* Features Section */
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

        /* Testimonials Section */
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

        /* Call-to-Action Section */
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

        /* Responsive Adjustments */
        @media (max-width: 768px) {
          .hero h1 {
            font-size: 2.5rem;
          }
          .features h2,
          .call-to-action h2 {
            font-size: 2rem;
          }
          .hero p,
          .features p {
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
