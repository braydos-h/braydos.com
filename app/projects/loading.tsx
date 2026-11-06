export default function ProjectsLoading() {
  return (
    <section className="section projects-index" aria-busy="true" aria-label="Loading projects">
      <div className="site-container">
        <div className="loading-toolbar skeleton" />
        <div className="index-results-bar">
          <span className="loading-copy skeleton" />
        </div>
        <div className="index-grid">
          {Array.from({ length: 6 }).map((_, index) => (
            <div className="index-card loading-card" key={index}>
              <span className="loading-copy skeleton" />
              <span className="loading-title skeleton" />
              <span className="loading-copy skeleton" />
              <span className="loading-copy loading-copy-short skeleton" />
              <div className="loading-tags">
                <span className="skeleton" />
                <span className="skeleton" />
                <span className="skeleton" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
