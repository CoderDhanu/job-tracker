import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function InputField({
  label,
  id,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  required = false,
  disabled = false,
  icon = null,
  iconPosition = "left",
  rows,
  className = "",
  ...props
}) {
  const isTextarea = type === "textarea";
  const inputClasses = `flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors ${
    error ? "border-red-500 focus:ring-red-500" : "border-gray-300"
  } disabled:bg-gray-100 disabled:cursor-not-allowed ${className}`;

  const iconClasses = "text-gray-400 flex items-center px-2";

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

      <div className={`flex items-center ${icon ? "border rounded-lg" : ""} ${
        error ? "border-red-500" : "border-gray-300"
      }`}>
        {icon && iconPosition === "left" && (
          <div className={iconClasses}>
            <FontAwesomeIcon icon={icon} />
          </div>
        )}

        {isTextarea ? (
          <textarea
            id={id || name}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            rows={rows || 4}
            className={`${inputClasses} ${icon ? "border-0" : ""}`}
            {...props}
          />
        ) : (
          <input
            id={id || name}
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            className={`${inputClasses} ${icon ? "border-0" : ""}`}
            {...props}
          />
        )}

        {icon && iconPosition === "right" && (
          <div className={iconClasses}>
            <FontAwesomeIcon icon={icon} />
          </div>
        )}
      </div>

      {error && <p className="text-red-500 text-sm self-start">{error}</p>}
    </div>
  );
}
