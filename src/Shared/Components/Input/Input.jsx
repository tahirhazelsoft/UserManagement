import React from "react";

function Input({ name, type, placeholder, value, onChange, onBlur, error, touched, className }) {
  return (
    <div>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className={`${className} ${touched && error ? "border-danger" : ""}`}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
      />
      {touched && error && <div className="text-danger small mt-1 text-start">{error}</div>}
    </div>
  );
}

export default Input;
