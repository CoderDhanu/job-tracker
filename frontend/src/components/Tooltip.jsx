import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

const Tooltip = ({
  text,
  icon = faCircleInfo,
  position = "bottom",
  className = "",
}) => {
  const positionClasses = {
    bottom: "bottom-full right-0 mb-2",
    top: "top-full right-0 mt-2",
    left: "right-full top-0 mr-2",
    right: "left-full top-0 ml-2",
  };

  return (
    <div className="group relative inline-block">
      <FontAwesomeIcon
        icon={icon}
        className={`text-gray-400 hover:text-gray-600 cursor-help transition-colors ${className}`}
      />
      <div
        className={`absolute ${positionClasses[position]} px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`}
      >
        {text}
      </div>
    </div>
  );
};

export default Tooltip;
