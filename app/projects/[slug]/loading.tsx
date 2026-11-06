export default function ProjectDetailLoading() {
  return (
    <div className="project-detail loading-detail" aria-busy="true" aria-label="Loading project">
      <div className="detail-hero">
        <div className="site-container">
          <span className="loading-copy loading-copy-short skeleton" />
          <span className="loading-display skeleton" />
          <span className="loading-copy skeleton" />
          <span className="loading-copy loading-copy-short skeleton" />
          <div className="loading-detail-visual skeleton" />
        </div>
      </div>
      <div className="site-container">
        <div className="detail-layout">
          <div>
            <span className="loading-title skeleton" />
            <span className="loading-copy skeleton" />
            <span className="loading-copy skeleton" />
            <span className="loading-copy loading-copy-short skeleton" />
          </div>
          <div className="loading-detail-side skeleton" />
        </div>
      </div>
    </div>
  );
}
