'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ItemProps {
  title: string;
  image?: string;
  company?: string;
  link?: string;
  jobId?: string;
  showDelete?: boolean;
  onDelete?: () => void;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  loggedIn?: boolean;
}


function getRandomStockImage(): string {
  const index = Math.floor(Math.random() * 10) + 1;
  return `/default-image${index}.jpeg`;
}

export default function Item({
  title,
  image,
  company,
  link,
  jobId,
  showDelete,
  onDelete,
  isFavorite,
  onToggleFavorite,
  loggedIn,
}: ItemProps) {
  const [randomImage] = useState(getRandomStockImage());
  const displayImage = image?.trim() ? image : randomImage;

  return (
    <div className={`item ${showDelete ? 'editing' : ''}`}>
      {showDelete && jobId && (
        <div className="edit-actions">
          <div className="button-row">
            <button className="delete" onClick={(e) => {
              e.preventDefault();
              if (confirm('Delete this job?')) {
                fetch(`/api/jobs/delete?id=${jobId}`, {
                  method: 'DELETE',
                }).then(res => {
                  if (res.ok) onDelete?.();
                  else alert('Failed to delete');
                });
              }
            }}>🗑️ Delete</button>

            <button className="save" onClick={(e) => {
              e.preventDefault();
              onToggleFavorite?.();
            }}>
              {isFavorite ? '❤️ Saved' : '🤍 Save'}
            </button>
          </div>

          {loggedIn && (
            <div className="heart-row">
              <button className="favorite" onClick={(e) => {
                e.preventDefault();
                onToggleFavorite?.();
              }}>
                {isFavorite ? '❤️' : '🤍'}
              </button>
            </div>
          )}
        </div>
      )}
      <a
        href={link || '#'}
        target="_blank"
        rel="noopener noreferrer"
        className="item-link"
      >
        <div className="image-wrapper">
          <Image
            src={displayImage}
            alt={title}
            width={200}
            height={150}
          />
        </div>
        <h3>{title}</h3>
        {company?.trim() && <p className="comp">{company}</p>}
      </a>

      <style jsx>{`
        .item {
          border: 1px solid #ccc;
          padding: 1rem;
          text-align: center;
          cursor: pointer;
          transition: transform 0.2s ease, min-height 0.2s ease;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .item.editing {
          min-height: 365px;
        }
        .item:hover {
          transform: scale(1.03);
        }
        .item-link {
          text-decoration: none;
          color: inherit;
        }
        .image-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 0.5rem;
        }
        h3 {
          margin: 0.5rem 0 0.25rem;
          font-size: 1rem;
          line-height: 1.3;
          white-space: normal;
          word-wrap: break-word;
        }
        .comp {
          font-size: 0.85rem;
          color: #666;
          margin-top: 0.25rem;
          line-height: 1.2;
        }
        .edit-actions {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 0.25rem;
          position: sticky;
        }
        .button-row {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 0.3rem;
        }
        .heart-row {
          margin-bottom: 0.rem;
          display: flex;
          justify-content: center;
        }
        button.save {
          background-color: green;
          color: white;
          border: none;
          padding: 0.3rem 0.5rem;
          border-radius: 4px;
          cursor: pointer;
        }
        button.delete {
          background-color: crimson;
          color: white;
          border: none;
          padding: 0.3rem 0.5rem;
          border-radius: 4px;
          cursor: pointer;
        }
        button.favorite {
          background-color: transparent;
          border: none;
          font-size: 1.4rem;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
