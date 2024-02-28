import React, { useState } from "react";
import { useRef } from "react";
import SelectArrow from "../../assets/SelectArrow";
import styles from "./index.scss";
import SelectArrowDown from "../../assets/SelectArrowDown";
const SelectBox = ({
  placeHolder,
  options,
  onChange,
  setSelectedValue,
  selectedValue,
  errorDismissOnclick,
}) => {
  // Setting state for displaying the drop down options
  const [showMenu, setShowMenu] = useState(false);

  // Function for Displaying the drop down options
  const handleInputClick = (e) => {
    //e.stopPropagation();
    setShowMenu(!showMenu);
    errorDismissOnclick();
  };
  const toggle = (showMenu) => {
    return setShowMenu(!showMenu);
  };
  // Function for closing the dropdown when clicking outside
  const menuRef = useRef(null);

  const getDisplay = () => {
    if (!selectedValue || selectedValue.length === 0) {
      return placeHolder;
    }
    return selectedValue;
  };
  // Function for displaying the selected option by replacing the placeholder

  const onItemClick = (option) => {
    let newValue;
    newValue = option;
    setSelectedValue(newValue);
    onChange(newValue);
    setShowMenu(!showMenu);
  };
  // Function for checking whether the option is selected or not
  const isSelected = (option) => {
    if (!selectedValue) {
      return false;
    } else {
      return selectedValue === option.value;
    }
  };
  // Function for getting the selected option
  const getOptions = () => {
    return options;
  };

  return (
    <div className="dropdownContainer" ref={menuRef}>
      <div
        onClick={() => {
          toggle(showMenu);
          handleInputClick();
        }}
        className="dropdownInput"
      >
        <div className={styles.dropdownSelected}>{getDisplay()}</div>
        <div>
          <div className="dropdownTool">
            {!showMenu ? <SelectArrow /> : <SelectArrowDown />}
          </div>
        </div>
      </div>
      {/* For displaying the dropdown section */}
      {showMenu && (
        <div className="dropdownMenu">
          {getOptions().map((option) => (
            <div className="selectOptionsDiv">
              <div
                onClick={() => onItemClick(option)}
                key={option.value}
                value={option.value}
                className={`dropdown-item ${isSelected(option) && "selected"}`}
              >
                {option.label}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectBox;
