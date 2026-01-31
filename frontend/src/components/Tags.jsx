const Tags = ({ label, className = "" }) => {
  if (!label) return null;

  return (
    <span
      className={`text-xs font-semibold px-3 py-1 rounded-md whitespace-nowrap ${className}`}
    >
      {label}
    </span>
  );
};

export default Tags;
