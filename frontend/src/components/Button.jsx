import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  onClick,
  className = "",
  type = "button",
  icon = null,
  iconPosition = "left",
  ...props
}) {
  // Variant styles
  const variantStyles = {
    primary:
      "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
    secondary:
      "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    danger_outline:
      "bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 focus:ring-red-500",
    success: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
    warning:
      "bg-yellow-600 text-white hover:bg-yellow-700 focus:ring-yellow-500",
    outline:
      "border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500",
  };

  // Size styles
  const sizeStyles = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-2 text-sm",
    lg: "px-4 py-3 text-base",
    xl: "px-6 py-4 text-lg",
  };

  // Base styles
  const baseStyles =
    "font-medium rounded disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2";

  // Combined classes
  const combinedClasses = `${baseStyles} ${variantStyles[variant] || variantStyles.primary} ${sizeStyles[size]} ${className}`;

  // Render icon
  const renderIcon = () => {
    if (loading) {
      return <FontAwesomeIcon icon={faSpinner} spin />;
    }
    return icon ? <FontAwesomeIcon icon={icon} /> : null;
  };

  const iconElement = renderIcon();

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={combinedClasses}
      {...props}
    >
      {iconPosition === "left" && iconElement}
      {children}
      {iconPosition === "right" && iconElement}
    </button>
  );
}
