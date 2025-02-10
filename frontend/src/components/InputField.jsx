import React from "react";

const InputField = ({
  label,
  id,
  type = "text",
  value,
  onChange,
  placeholder = "",
  error,
  additionalInfo,
  options = [],
  multiple = false,
  className = "", // Custom styles
}) => {
  // Base styles
  const baseStyles =
    "w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 transition-all";
  const defaultInputStyles = "border-gray-300 text-gray-700 bg-white focus:ring-primary";
  const errorStyles = "border-red-500 focus:ring-red-500";

  return (
    <div className="mb-4">
      {/* Label with Additional Info */}
      <label className="block text-sm font-semibold mb-1 text-primary" htmlFor={id}>
        {label}
        {additionalInfo && <span className="text-xs text-gray-500 ml-2">{additionalInfo}</span>}
      </label>

      {/* Input Field / Select */}
      {type === "select" || type === "multiselect" ? (
        <select
          id={id}
          multiple={multiple}
          className={`${baseStyles} ${error ? errorStyles : defaultInputStyles} ${className}`}
          value={value}
          onChange={onChange}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          type={type}
          className={`${baseStyles} ${error ? errorStyles : defaultInputStyles} ${className}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      )}

      {/* Error Message */}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default InputField;
