import db from '@/lib/db';
import Card from '@/components/Card';
import AdPlaceholder from '@/components/AdPlaceholder';

export const dynamic = 'force-dynamic';

export default async function CategoryPage({ params }) {
    const { category: rawCategory } = await params;
    const category = rawCategory.charAt(0).toUpperCase() + rawCategory.slice(1);

    const posts = db.prepare('SELECT * FROM posts WHERE category = ? ORDER BY published_at DESC')
        .all(category);

    return (
        <div>
            <header className="category-header">
                <h1>{category} Articles</h1>
                <p>Browsing all posts in {category}</p>
            </header>

            <div className="grid">
                <div className="posts-grid">
                    {posts.length > 0 ? (
                        posts.map(post => <Card key={post.id} post={post} />)
                    ) : (
                        <p>No posts found in this category.</p>
                    )}
                </div>

                <aside>
                    <AdPlaceholder type="sidebar" />
                </aside>
            </div>


        </div>
    );
}
