import React from "react";

export default function InputField({ id, label, type = "text", placeholder = "", value, onChange }) {
  const handleInputChange = (event) => {
    onChange(id, event.target.value); // Notifica al componente padre il cambiamento
  };

  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input
        type={type}
        className="form-control"
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
      />
    </div>
  );
}

