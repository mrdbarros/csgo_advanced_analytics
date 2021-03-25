export const GraphTitle = ({ graphTitle, graphSubtitle }) => {
  return (
    <div className="graph-full-title">
      <h1 className="graph-title">{graphTitle}</h1>
      <h2 className="graph-subtitle">{graphSubtitle}</h2>
    </div>
  );
};
