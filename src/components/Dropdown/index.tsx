import React, { useState } from "react";
import "./Dropdown.scss"; // Create a CSS file for styling

interface CustomDropdownProps {
  options: string[];
  value: string;
  onChange: (selectedOption: string) => void;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="custom-dropdown">
      <div className={`dropdown-header ${isOpen ? "open" : ""}`} onClick={() => setIsOpen(!isOpen)}>
        {value}
        <i className={`arrow ${isOpen ? "open" : ""}`}></i>
      </div>
      {isOpen && (
        <ul className="dropdown-options">
          {options.map((option) => (
            <li key={option} onClick={() => handleOptionClick(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;
