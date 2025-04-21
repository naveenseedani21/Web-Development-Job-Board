// app/items/page.tsx
'use client';
import { useEffect, useState } from 'react';
import Item from '../components/Item';

interface job {
  _id: string;
  title: string;
  image?: string;
}
// const items = [
//   {
//     id: 1,
//     title: 'Software Engineer',
//     image: '/job1.jpg'
//   },
//   {
//     id: 2,
//     title: 'Data Analyst',
//     image: '/job2.jpg'
//   },
//   {
//     id: 3,
//     title: 'Cyber Security Specialist',
//     image: '/job3.jpg'
//   },
// ];

export default function ItemsPage() {
  const [jobs, setJobs] = useState<job[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchJobs = async () => {
    const res = await fetch('/api/jobs');
    const data = await res.json();
    setJobs(data.jobs);
  };

  const syncJobs = async () => {
    setLoading(true);
    const res = await fetch('/api/jobs/sync');
    const data = await res.json();
    await fetchJobs();
    setLoading(false);
    alert(`Synced ${data.count} jobs!`);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="items">
      <h2>Job Listings</h2>

      <button onClick={syncJobs} disabled={loading} style={{marginBottom: '1rem' }}>
        {loading ? 'Syncing...' : 'Sync Jobs'}
      </button>

      <div className="item-list">
        {jobs.map((job) => (
          <Item 
          key={job._id} 
          title={job.title} 
          image={job.image || '/default-job.jpg'} // fallback 
          />
        ))}
      </div>

      <style jsx>{`
        .items {
          padding: 2rem;
        }
        .item-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }
        button {
          padding: 0.5rem 1rem;
          background-color: #0070f3;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 1rem;
        }
        button:disabled {
          background-color: gray;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}
