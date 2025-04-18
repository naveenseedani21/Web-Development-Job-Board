// components/Item.tsx
'use client';

import Image from 'next/image';

interface ItemProps {
  title: string;
  image: string;
}

export default function Item({ title, image }: ItemProps) {
  return (
    <div className="item">
      <Image src={image} alt={title} width={200} height={150} />
      <h3>{title}</h3>
      <style jsx>{`
        .item {
          border: 1px solid #ccc;
          padding: 1rem;
          text-align: center;
        }
        h3 {
          margin-top: 0.5rem;
        }
      `}</style>
    </div>
  );
}
