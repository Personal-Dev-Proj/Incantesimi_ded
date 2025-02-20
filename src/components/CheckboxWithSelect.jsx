import React, { useState } from "react";

export default function CheckboxWithSelect({id, label, isChecked, level, onChange}){
    // const [isChecked, setIsChecked] = useState(false);
    // const [selectedValue, setSelectedValue] = useState("0");
    
    const handleCheckboxChange = (event) => {
        const checked = event.target.checked;
        setIsChecked(checked);
        onChange(id, checked, selectedValue); // Notifica il genitore
      };

      const handleSelectChange = (event) => {
        const value = event.target.value;
        setSelectedValue(value);
        onChange(id, isChecked, value); // Notifica il genitore
      };

    return(
        <div className="d-flex align-items-center">
          <div className="d-flex align-items-center class-input">
            <input
              className="form-check-input"
              type="checkbox"
              id={id}
              checked={isChecked}
              onChange={(e) => onChange(id, e.target.checked, level)}
            />
            <label className="form-check-label mx-2" htmlFor={id}>
              {label}
            </label>
          </div>
            {isChecked && (
          <div className="d-flex">
            <p className="form-check-label mb-0 me-2">Lvl.</p>
              <select
                className=""
                aria-label="Small select example"
                defaultValue="0"
                onChange={(e) => onChange(id, isChecked, e.target.value)}
                disabled={!isChecked}
              >
                {[...Array(10).keys()].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
          </div>
            )}
      </div>
    )
}