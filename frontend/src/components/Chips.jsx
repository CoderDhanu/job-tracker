const Chips = ({
  skills = [],
  emptyText,
  variant = "default",
  containerClassName = "flex flex-wrap gap-2",
}) => {
  const colorVariants = {
    default: "bg-cyan-50 text-cyan-700",
    alternative: "bg-purple-50 text-purple-700 border-purple-200",
  };

  const baseStyles = {
    default: "text-xs px-2.5 py-1 rounded-full font-medium",
    alternative: "px-3 py-2 rounded-lg font-medium border",
  };

  const colorClass = colorVariants[variant] || colorVariants.default;
  const baseClass = baseStyles[variant] || baseStyles.default;
  const chipClassName = `${baseClass} ${colorClass}`;

  if (!Array.isArray(skills) || skills.length === 0) {
    return emptyText ? (
      <span className="text-gray-500">{emptyText}</span>
    ) : null;
  }

  return (
    <div className={containerClassName}>
      {skills.map((skill, index) => (
        <span key={`${skill}-${index}`} className={chipClassName}>
          {skill}
        </span>
      ))}
    </div>
  );
};

export default Chips;
