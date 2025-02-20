import React from "react";

export default function SelectField({ id, label, value, firstOption, options, onChange }) {



    return (
        <div className="mb-3">
            <label htmlFor={id} className="form-label text-secondary fw-bold">
                {label}
            </label>
            <select
                id={id}
                className="form-select"
                value={value}
                onChange={(e) => onChange(id, e.target.value)}
            >
                <option value="">{firstOption}</option>
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}
