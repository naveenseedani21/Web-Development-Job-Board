// components/Item.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';

interface ItemProps {
  title: string;
  image: string;
  company?: string;
  link?: string;
  onClick?: () => void;
}

function getRandomStockImage(): string {
  const index = Math.floor(Math.random() * 6) + 1; // 1 to 6
  return `/default-image${index}.jpeg`;
}

export default function Item({ title, image, company, link}: ItemProps) {
  const displayImage = image?.trim() ? image : getRandomStockImage();
  return (
    <a
      href={link || '#'}
      target="_blank"
      rel="noopener noreferrer"
      className="item"
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
      
      <style jsx>{`
        .image-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 0.5rem;
        }
        .item-link {
          text-decoration: none;
          color: inherit;
        }
        .item {
          border: 1px solid #ccc;
          padding: 1rem;
          text-align: center;
          cursor: pointer;
          transition: transform 0.2s ease;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 340px;

        }
        .item:hover {
          transform: scale(1.03);
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
      `}</style>
    </a>
  );
}
