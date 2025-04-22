'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Splash() {
  const [fileName, setFileName] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [matches, setMatches] = useState<any[]>([]);
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        console.error(data.error);
        return;
      }

      console.log('Top Matches:', data.matches);
      setMatches(data.matches);
    } catch (err) {
      console.error('Upload failed:', err);
    }
  };

  return (
    <div className="splash">
      <div className="image-container">
        <Image
          src="/arch.jpg"
          alt="Splash Image"
          fill
          priority
          quality={100}
          style={{ objectFit: 'cover' }}
        />
        <div className="overlay">
          <h1>Unlock Your Future at UGA</h1>
          <p>Upload your resume to receive job matches tailored just for you.</p>
        </div>
      </div>

      <div className="upload-container">
        <form onSubmit={handleSubmit} className="upload-form">
          <input
            id="fileInput"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          <label htmlFor="fileInput" className="custom-file-upload">
            {fileName ? `Selected: ${fileName}` : 'Choose Your Resume'}
          </label>
          <button type="submit" className="btn primary" disabled={!file}>
            {file ? 'Upload & Continue' : 'Upload Resume'}
          </button>
        </form>

        {/* Matched Results */}
        {matches.length > 0 && (
          <div className="results">
            <h2>Top Job Matches</h2>
            {matches.map((job, index) => (
              <div key={index} className="job-card">
                <h3>{job.title}</h3>
                <p><strong>Company:</strong> {job.company}</p>
                <p><strong>Match Score:</strong> {job.matchScore}%</p>
                <p><strong>Matched Skills:</strong> {(job.matchedSkills || []).join(', ')}</p>
                <p><strong>Description:</strong> {(job.description || []).join(', ')}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .splash {
          display: flex;
          flex-direction: column;
          align-items: center;
          background-color: #000;
          color: #fff;
          min-height: 100vh;
        }
        .image-container {
          position: relative;
          width: 100%;
          height: 50vh;
        }
        .overlay {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          background: rgba(0, 0, 0, 0.6);
          padding: 2rem;
          border-radius: 12px;
          backdrop-filter: blur(5px);
        }
        .overlay h1 {
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
          color: #ba0c2f;
        }
        .overlay p {
          font-size: 1.2rem;
          margin: 0;
        }
        .upload-container {
          width: 100%;
          max-width: 500px;
          background: #1e1e1e;
          margin-top: -3rem;
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
          text-align: center;
          z-index: 2;
        }
        .upload-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          align-items: center;
        }
        .custom-file-upload {
          padding: 0.75rem 1.5rem;
          border: 2px dashed #ba0c2f;
          background: transparent;
          border-radius: 8px;
          color: #ba0c2f;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .custom-file-upload:hover {
          background: #ba0c2f;
          color: #fff;
        }
        .btn.primary {
          background: #ba0c2f;
          color: #fff;
          padding: 0.75rem 2rem;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          cursor: pointer;
          transition: background 0.3s ease;
        }
        .btn.primary:hover {
          background: #a50c29;
        }
        .btn.primary:disabled {
          background: #555;
          cursor: not-allowed;
        }
        .results {
          margin-top: 2rem;
          background: #111;
          padding: 1.5rem;
          border-radius: 8px;
          color: #fff;
          max-width: 600px;
        }
        .results h2 {
          color: #ba0c2f;
          font-size: 1.5rem;
          margin-bottom: 1rem;
        }
        .job-card {
          background: #222;
          padding: 1rem;
          border-radius: 6px;
          margin-bottom: 1rem;
          box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
        }
        .job-card h3 {
          color: #fff;
          margin-bottom: 0.5rem;
        }
        .job-card p {
          margin: 0.3rem 0;
        }
        @media (max-width: 768px) {
          .overlay h1 {
            font-size: 2rem;
          }
          .overlay p {
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
}
