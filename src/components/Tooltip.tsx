const Tooltip: React.FC<{ content: string }> = ({ content }) => (
  <div className="bg-white text-black p-2 border rounded shadow">
    {content}
  </div>
);

export default Tooltip;