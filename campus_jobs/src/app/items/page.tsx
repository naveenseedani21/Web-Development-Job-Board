// app/items/page.tsx
'use client';
import { useEffect, useState } from 'react';
import Item from '../components/Item';

interface job {
  _id: string;
  title: string;
  image?: string;
  link?: string;
  company?: string;
}

export default function ItemsPage() {
  const [jobs, setJobs] = useState<job[]>([]);
  const [loading, setLoading] = useState(false);
  const [brokenJobs, setBrokenJobs] = useState<job[]>([]);

  const fetchJobs = async () => {
    const res = await fetch('/api/jobs');
    const data = await res.json();

    console.log('Fetched jobs:', data.jobs);
    
    const valid = data.jobs.filter((job: job) => job.title !== 'Untitled');
    const broken = data.jobs.filter((job: job) => job.title === 'Untitled');

    setJobs(valid);
    setBrokenJobs(broken);
  };

  const syncJobs = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/jobs/sync');
      if (!res.ok) throw new Error('Sync failed');
      const data = await res.json();
      await fetchJobs();
      
      alert(`Synced ${data.count} jobs!`);
    } catch (err) {
      console.error('Sync error:', err);
      alert('Failed to sync jobs.');
    } finally {
      setLoading(false);
    }
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
      {jobs.map((job) => {
        console.log('Rendering job:', job); // debug this
        return (
        <Item 
          key={job._id} 
          title={job.title} 
          image={job.image || '/default-job.png'}
          company={job.company}
          link={job.link}
        />
        );
      })}
      </div>

      {brokenJobs.length > 0 && (
        <>
          <h3 style={{ marginTop: '2rem' }}> Jobs Missing Titles</h3>
          <div className="item-list">
            {brokenJobs.map((job, i) => (
              <Item 
                key={i} 
                title={job.title} 
                image={job.image || '/default-job.png'}
                company={job.company}
                link={job.link}
              />
            ))}
        </div>
        </>
      )}

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
        h3 {
          margin-top: 1rem;
        }
      `}</style>
    </div>
  );
}
