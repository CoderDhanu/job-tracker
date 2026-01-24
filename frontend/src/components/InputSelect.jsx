import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

export default function InputSelect({
  label,
  id,
  name,
  value,
  onChange,
  options = [],
  error,
  required = false,
  disabled = false,
  icon = null,
  className = "",
  ...props
}) {
  const selectClasses = `flex-1 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors appearance-none cursor-pointer disabled:bg-gray-100 disabled:cursor-not-allowed bg-transparent ${className}`;

  const iconClasses = "text-gray-400 flex items-center px-2 pointer-events-none";

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label
          htmlFor={id || name}
          className="block text-sm font-medium text-gray-700 self-start"
        >
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}

      <div className={`flex items-center border rounded-lg ${
        error ? "border-red-500" : "border-gray-300"
      }`}>
        {icon && (
          <div className={iconClasses}>
            <FontAwesomeIcon icon={icon} />
          </div>
        )}

        <select
          id={id || name}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={selectClasses}
          {...props}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        {/* Dropdown arrow icon */}
        <div className={iconClasses}>
          <FontAwesomeIcon icon={faChevronDown} className="text-xs" />
        </div>
      </div>

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
