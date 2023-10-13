import React, { useState } from "react";
import "./Dropdown.scss"; // Create a CSS file for styling

interface CustomDropdownProps {
  options: string[];
  value: string;
  onChange: (selectedOption: string) => void;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option: string, index: number) => {
    if (index !== 2) { // Prevent click action for the third option
      onChange(option);
      setIsOpen(false);
    }
  };

  return (
    <div className="custom-dropdown">
      <div className={`dropdown-header ${isOpen ? "open" : ""}`} onClick={() => setIsOpen(!isOpen)}>
        {value}
        <i className={`arrow ${isOpen ? "open" : ""}`}></i>
      </div>
      {isOpen && (
        <ul className="dropdown-options">
          {options.map((option, index) => (
            <li key={option} onClick={() => handleOptionClick(option, index)} className={index === 2 ? "disabled" : ""}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;
