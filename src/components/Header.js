'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import SubscribeModal from './SubscribeModal';

export default function Header() {
  const router = useRouter();

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      router.push(`/?search=${encodeURIComponent(e.target.value)}`);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <header className="header">
      <div className="container header-content">
        <a href="/" className="logo">
          Blog<span style={{ color: 'var(--primary)' }}>MVP</span>
        </a>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search articles..."
            onKeyDown={handleSearch}
          />
        </div>
        <nav>
          <a href="/category/tech">Tech</a>
          <a href="/category/lifestyle">Lifestyle</a>
          <a href="/admin/write" className="admin-link">write</a>
          <button className="btn" onClick={() => setIsModalOpen(true)}>Subscribe</button>
        </nav>
      </div>
      <SubscribeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </header>
  );
}
