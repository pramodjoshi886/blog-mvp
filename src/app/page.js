import db from '@/lib/db';
import Card from '@/components/Card';
import AdPlaceholder from '@/components/AdPlaceholder';

// Force dynamic since we read from DB directly
export const dynamic = 'force-dynamic';

async function getPosts(searchParams) {
  if (searchParams?.search) {
    const term = `%${searchParams.search}%`;
    const { rows } = await db.query(
      'SELECT * FROM posts WHERE title ILIKE $1 OR summary ILIKE $1 ORDER BY published_at DESC',
      [term]
    );
    return rows;
  }

  const { rows } = await db.query('SELECT * FROM posts ORDER BY published_at DESC');
  return rows;
}

export default async function Home({ searchParams }) {
  const sp = await searchParams;
  const posts = await getPosts(sp);

  const isSearching = !!sp?.search;

  // If searching, show all matches in main grid, no featured section
  const featured = isSearching ? [] : posts.filter(p => p.is_featured);
  const regular = isSearching ? posts : posts.filter(p => !p.is_featured);

  return (
    <>
      {!isSearching && featured.length > 0 && (
        <section className="hero">
          <h2 className="section-title">Featured Stories</h2>
          <div className="featured-grid">
            {featured.map(post => (
              <div key={post.id} className="featured-wrapper">
                <Card post={post} />
              </div>
            ))}
          </div>
        </section>
      )}

      {isSearching && (
        <h2 className="section-title">Search Results for "{sp.search}"</h2>
      )}

      {!isSearching && <AdPlaceholder type="feed" />}

      <section className="latest">
        {!isSearching && <h2 className="section-title">Latest Articles</h2>}
        <div className="grid">
          <div className="main-content">
            <div className="posts-grid">
              {regular.length > 0 ? (
                regular.map(post => (
                  <Card key={post.id} post={post} />
                ))
              ) : (
                <p>No posts found.</p>
              )}
            </div>
          </div>
          <aside className="sidebar">
            <AdPlaceholder type="sidebar" />
            <div className="trending">
              <h3>Trending</h3>
              <ul>
                <li><a href="#">AI Revolution</a></li>
                <li><a href="#">Remote Work Tips</a></li>
                <li><a href="#">JavaScript 2025</a></li>
              </ul>
            </div>
          </aside>
        </div>
      </section>


    </>
  );
}
