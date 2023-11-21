import React from "react";

const TextInput = ({
  value,
  placeholder,
  onChange,
  type,
  name,
  error,
  disabled,
}) => {
  return (
    <div className="mt-3">
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required
        disabled={disabled}
        placeholder={placeholder}
        className="form-control"
      />
      {error && <p className="input_error">{error}</p>}
    </div>
  );
};

export default TextInput;
