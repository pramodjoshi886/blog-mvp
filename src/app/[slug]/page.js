import db from '@/lib/db';
import AdPlaceholder from '@/components/AdPlaceholder';
import LikeShare from '@/components/LikeShare';
import DeleteButton from '@/components/DeleteButton';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

async function getPost(slug) {
    await db.query('UPDATE posts SET views = views + 1 WHERE slug = $1', [slug]);
    const { rows } = await db.query('SELECT * FROM posts WHERE slug = $1', [slug]);
    return rows[0];
}

export default async function ArticlePage({ params }) {
    const { slug } = await params;
    const post = await getPost(slug);

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
