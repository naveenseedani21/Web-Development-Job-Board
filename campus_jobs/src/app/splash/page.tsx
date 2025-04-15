'use client'; // Mark as a Client Component

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Splash() {
  const [fileName, setFileName] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (file) {
      console.log('Resume Uploaded:', file.name);
      // You would typically upload the file here
    }
    router.push('/');
  };

  return (
    <div className="splash">
      <div className="image-container">
        <Image
          src="/arch.jpg"
          alt="Splash Image"
          fill
          quality={100}
          style={{ objectFit: 'cover' }}
        />
      </div>

      <div className="upload-container">
        <h2>Upload Your Resume</h2>
        <p>Submit your resume to receive personalized job recommendations.</p>
        <form onSubmit={handleSubmit} className="upload-form">
          {/* Hidden file input */}
          <input
            id="fileInput"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          {/* Custom button that triggers the hidden input */}
          <label htmlFor="fileInput" className="custom-file-upload">
            {fileName ? fileName : 'Choose Your Resume'}
          </label>
          <button type="submit" className="btn primary">
            Upload Resume
          </button>
        </form>
      </div>

      <style jsx>{`
        .splash {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 2rem;
          background-color: #000;
          color: #fff;
        }
        .image-container {
          position: relative;
          width: 100%;
          height: min(calc(100vw / 2), 400px);
          overflow: hidden;
          background-color: #000;
        }
        .upload-container {
          margin-top: 2rem;
          width: 100%;
          max-width: 600px;
          background: rgba(0, 0, 0, 0.75);
          padding: 2rem;
          border-radius: 8px;
          text-align: center;
        }
        .upload-container h2 {
          font-size: 2rem;
          margin-bottom: 1rem;
          color: #ba0c2f;
        }
        .upload-container p {
          font-size: 1.1rem;
          margin-bottom: 1.5rem;
        }
        .upload-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          align-items: center;
        }
        /* Custom file upload button styling */
        .custom-file-upload {
          display: inline-block;
          padding: 0.75rem 1.5rem;
          cursor: pointer;
          background-color: transparent;
          border: 2px solid #ba0c2f;
          border-radius: 4px;
          color: #ba0c2f;
          transition: background 0.3s ease, color 0.3s ease;
          font-size: 1rem;
        }
        .custom-file-upload:hover {
          background-color: #ba0c2f;
          color: #fff;
        }
        .btn.primary {
          background-color: #ba0c2f;
          color: #fff;
          border: none;
          padding: 0.75rem 1.5rem;
          font-size: 1rem;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .btn.primary:hover {
          background-color: #a50c29;
        }
      `}</style>
    </div>
  );
}
