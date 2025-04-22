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
  const [loggedIn, setLoggedIn] = useState(false);
  const [jobs, setJobs] = useState<job[]>([]);
  const [loading, setLoading] = useState(false);
  const [brokenJobs, setBrokenJobs] = useState<job[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');
  const [uniqueCompanies, setUniqueCompanies] = useState<string[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setLoggedIn(!!token);
  }, []);

  const toggleFavorite = (jobId: string) => {
    const updated = favorites.includes(jobId)
      ? favorites.filter(id => id !== jobId)
      : [...favorites, jobId];
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesQuery =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchCompany = selectedCompany === '' || job.company === selectedCompany;
    const matchFavorite = !showFavoritesOnly || favorites.includes(job._id);

    return matchesQuery && matchCompany && matchFavorite;
  });

  const fetchJobs = async () => {
    const res = await fetch('/api/jobs');
    const data = await res.json();

    const valid = data.jobs.filter((job: job) => job.title !== 'Untitled');
    const broken = data.jobs.filter((job: job) => job.title === 'Untitled');

    setJobs(valid);
    setBrokenJobs(broken);

    const companySet: Set<string> = new Set(
      valid.map((job: { company: any }) => job.company || 'Unknown')
    );
    setUniqueCompanies(Array.from(companySet).sort());
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

      <div className="search-filter-sync-wrapper">
        <input
          type="text"
          placeholder="Search jobs by title or department..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />

        <select
          className="company-select"
          value={selectedCompany}
          onChange={(e) => setSelectedCompany(e.target.value)}
        >
          <option value="">All Departments</option>
          {uniqueCompanies.map((company) => (
            <option key={company} value={company}>
              {company}
            </option>
          ))}
        </select>

        <label className="favorite-toggle">
          <input
            type="checkbox"
            checked={showFavoritesOnly}
            onChange={() => setShowFavoritesOnly(!showFavoritesOnly)}
          />
          Favorites Only
        </label>
      </div>

      <div className="jobs-found-sync">
        <p className="job-count">{filteredJobs.length} jobs found</p>
        <div className="button-group">
          <button onClick={syncJobs} disabled={loading}>
            {loading ? 'Syncing...' : 'Sync Jobs'}
          </button>
          {loggedIn && (
            <button onClick={() => setEditMode(!editMode)}>
              {editMode ? 'Done Editing' : 'Edit Jobs'}
            </button>
          )}
        </div>
      </div>

      <div className="item-list">
        {filteredJobs.map((job) => (
          <Item
            key={job._id}
            title={job.title}
            image={job.image}
            company={job.company}
            link={job.link}
            jobId={job._id}
            showDelete={editMode && loggedIn}
            onDelete={fetchJobs}
            isFavorite={favorites.includes(job._id)}
            onToggleFavorite={() => toggleFavorite(job._id)}
            loggedIn={loggedIn}
          />
        ))}
      </div>

      {brokenJobs.length > 0 && (
        <>
          <h3 style={{ marginTop: '2rem' }}>Jobs Missing Titles</h3>
          <div className="item-list">
            {brokenJobs.map((job, i) => (
              <Item
                key={i}
                title={job.title}
                image={job.image}
                company={job.company}
                link={job.link}
                jobId={job._id}
                showDelete={editMode}
                onDelete={fetchJobs}
              />
            ))}
          </div>
        </>
      )}

      {/* Your styles remain unchanged */}
      <style jsx>{`
        .button-group {
          display: flex;
          gap: 0.5rem;
        }
        .items {
          padding: 2rem;
        }
        .item-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }
        .search-filter-sync-wrapper {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          margin-bottom: 1rem;
        }
        .favorite-toggle {
          display: flex;
          align-items: center;
          font-size: 1rem;
          gap: 0.5rem;
        }
        .company-select {
          padding: 0.5rem;
          font-size: 1rem;
          border: 1px solid #ccc;
          border-radius: 6px;
          max-width: 200px;
        }
        .jobs-found-sync {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
          gap: 1rem;
        }
        .job-count {
          margin: 0;
          font-weight: 500;
          font-size: 1rem;
        }
        .search-input {
          padding: 0.5rem 1rem;
          font-size: 1rem;
          width: 100%;
          max-width: 400px;
          border: 1px solid #ccc;
          border-radius: 6px;
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
