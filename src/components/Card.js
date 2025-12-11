export default function Card({ post }) {
  return (
    <a href={`/${post.slug}`} className="card">
      <div className="card-image">
        <img src={post.image_url} alt={post.title} />
        <span className="badge">{post.category}</span>
      </div>
      <div className="card-content">
        <h3>{post.title}</h3>
        <p className="summary">{post.summary}</p>
        <div className="meta">
          <span>{post.read_time} min read</span>
          <span>•</span>
          <span>{new Date(post.published_at).toLocaleDateString()}</span>
        </div>
      </div>

    </a>
  );
}
