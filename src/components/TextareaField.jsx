import React from "react";

export default function TextareaField({ id, label, rows = 3, placeholder = "", value, onChange }) {
  const handleTextareaChange = (event) => {
    onChange(id, event.target.value); // Notifica al componente padre il cambiamento
  };

  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <textarea
        className="form-control"
        id={id}
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={handleTextareaChange}
      ></textarea>
    </div>
  );
}
