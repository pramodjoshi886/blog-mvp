export default function AdPlaceholder({ type = 'feed' }) {
  return (
    <div className={`ad-container ${type}`}>
      <span className="ad-label">Advertisement</span>
      <div className="ad-content">
        <h3>Sample Ad</h3>
        <p>Your ad here</p>
        {/* 
                   How to run Real Ads:
                   1. Register with Google AdSense/Mediavine
                   2. Copy the JS snippet they give you
                   3. Paste it here, replacing the <h3> and <p> tags.
                */}
      </div>

    </div>
  );
}
