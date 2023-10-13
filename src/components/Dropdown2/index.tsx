import React, { useState, useEffect, useRef } from "react";
import logo from '../../assets/images/LogoImg.png'
import "./Dropdown.scss";
import { ReactComponent as DownArrowIcon } from "../../assets/icons/down-arrow.svg";
// import { ReactComponent as DrodpownDownArrowIcon } from "../../assets/icons/dropdown-down-arrow.svg";

interface IDropdownProps {
  label: string;
  lists: {
    label: string;
    leftIcon?: string;
  }[];
  setSelectedList?: React.Dispatch<
    React.SetStateAction<{
      label: string;
      leftIcon?: string;
    } | null>
  >;
  selectedList?: {
    label: string;
    leftIcon?: string;
  } | null;
}

const Dropdown: React.FC<IDropdownProps> = ({
  lists,
  label,
  setSelectedList,
  selectedList,
}) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setOpenDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="dropdowns" ref={dropdownRef}>
      <div
        className="dropdowns-header"
        onClick={() => setOpenDropdown((d) => !d)}
      >
<img src={logo} style={{width:'20px',marginRight:'5px'}}></img>        <span>
          {/* <DrodpownDownArrowIcon /> */}
          {selectedList ? (
            <>
              <img src={selectedList?.leftIcon} alt="" />
              {selectedList.label}
            </>
          ) : (
            label
          )}
        </span>
        <svg role="img" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-down" className="svg-inline--fa fa-chevron-down drops" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#fff" d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"></path></svg>      </div>
      {openDropdown && (
        <div className="dropdowns-content">
          {lists.map((list, index) => (
            <div
              key={index}
              className="dropdowns-content-list"
              onClick={() => {
                if (setSelectedList) {
                  setSelectedList(list);
                }
                setOpenDropdown(false);
              }}
            >
              <span>
                {list.leftIcon && <img src={list.leftIcon} alt={list.label} />}
                &nbsp;{list.label}
              </span>
              {/* <DownArrowIcon /> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
