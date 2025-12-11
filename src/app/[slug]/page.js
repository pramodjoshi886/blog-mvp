import db from '@/lib/db';
import AdPlaceholder from '@/components/AdPlaceholder';
import LikeShare from '@/components/LikeShare';
import DeleteButton from '@/components/DeleteButton';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

function getPost(slug) {
    const update = db.prepare('UPDATE posts SET views = views + 1 WHERE slug = ?');
    update.run(slug);
    return db.prepare('SELECT * FROM posts WHERE slug = ?').get(slug);
}

export default async function ArticlePage({ params }) {
    const { slug } = await params;
    const post = getPost(slug);

    if (!post) {
        notFound();
    }

    return (
        <article className="article-container">
            <header className="article-header">
                <span className="category-pill">{post.category}</span>
                <h1>{post.title}</h1>
                <div className="meta">
                    <span>{new Date(post.published_at).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{post.read_time} min read</span>
                    <span>•</span>
                    <span>{post.views} views</span>
                </div>
                {post.image_url && (
                    <img src={post.image_url} alt={post.title} className="hero-image" />
                )}
            </header>

            <div className="content-layout">
                <div className="main-col">
                    <div className="content" dangerouslySetInnerHTML={{ __html: post.content }} />

                    <AdPlaceholder type="banner" />

                    <LikeShare slug={post.slug} initialLikes={post.likes} />
                </div>

                <aside className="sidebar-col">
                    <AdPlaceholder type="sidebar" />
                    <DeleteButton slug={post.slug} />
                </aside>
            </div>


        </article>
    );
}
