// app/items/page.tsx
'use client';
import Item from '../components/Item';

const items = [
  {
    id: 1,
    title: 'Software Engineer',
    image: '/job1.jpg'
  },
  {
    id: 2,
    title: 'Data Analyst',
    image: '/job2.jpg'
  },
  {
    id: 3,
    title: 'Cyber Security Specialist',
    image: '/job3.jpg'
  },
];

export default function ItemsPage() {
  return (
    <div className="items">
      <h2>Job Listings</h2>
      <div className="item-list">
        {items.map(item => (
          <Item key={item.id} title={item.title} image={item.image} />
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
      `}</style>
    </div>
  );
}
