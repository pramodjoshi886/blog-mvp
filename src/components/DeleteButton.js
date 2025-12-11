'use client';

import { useRouter } from 'next/navigation';

export default function DeleteButton({ slug }) {
    const router = useRouter();

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this post? This cannot be undone.')) return;

        try {
            const res = await fetch(`/api/posts/${slug}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                alert('Post deleted.');
                router.push('/');
                router.refresh();
            } else {
                alert('Failed to delete post.');
            }
        } catch (err) {
            alert('Error deleting post.');
        }
    };

    return (
        <>
            <button onClick={handleDelete} className="btn-delete">
                🗑️ Delete Post
            </button>
            <style jsx>{`
            .btn-delete {
                background: #ef4444;
                color: white;
                border: none;
                padding: 0.5rem 1rem;
                border-radius: var(--radius-sm);
                cursor: pointer;
                font-size: 0.875rem;
                margin-top: 1rem;
                width: 100%;
            }
            .btn-delete:hover {
                background: #dc2626;
            }
        `}</style>
        </>
    );
}
