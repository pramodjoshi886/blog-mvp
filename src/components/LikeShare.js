'use client';

import { useState } from 'react';

export default function LikeShare({ slug, initialLikes }) {
    const [likes, setLikes] = useState(initialLikes);
    const [hasLiked, setHasLiked] = useState(false);

    const handleLike = async () => {
        if (hasLiked) return;
        setLikes(prev => prev + 1);
        setHasLiked(true);

        try {
            await fetch(`/api/posts/${slug}`, { method: 'PATCH' });
        } catch (error) {
            console.error('Failed to update likes', error);
        }
    };

    const [shareText, setShareText] = useState('↗ Share');

    const handleShare = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setShareText('✓ Copied!');
            setTimeout(() => setShareText('↗ Share'), 2000);
        } catch (err) {
            alert('Failed to copy link');
        }
    };

    return (
        <div className="interactions">
            <button
                className={`btn ${hasLiked ? 'liked' : 'outline'}`}
                onClick={handleLike}
                disabled={hasLiked}
            >
                ❤️ {likes} Likes
            </button>
            <button className="btn outline" onClick={handleShare}>
                {shareText}
            </button>
            <style jsx>{`
        .interactions {
          display: flex;
          gap: 1rem;
          margin: 2rem 0;
          padding: 1rem 0;
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }
        .outline {
          background: transparent;
          border: 1px solid var(--primary);
          color: var(--primary);
        }
        .liked {
          background: var(--primary);
          color: white;
          border: 1px solid var(--primary);
        }
        .outline:hover {
          background: var(--ad-bg);
        }
      `}</style>
        </div>
    );
}
