import { useState, useRef, useEffect } from "react";
import ReactCountryFlag from "react-country-flag";

const CustomDropdown = ({
  options = [],
  selectedOption = "",
  setSelectedOption = () => undefined,
  handleOptionClick = () => undefined,
  handlePhoneNumber = () => undefined,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="p-4 relative" ref={dropdownRef}>
      <div className="flex flex-row justify-between items-center gap-2 w-full h-10 px-2 py-1 text-[#f5f5f5] rounded outline outline-2 outline-offset-0 outline-blue-500  select-none">
        <div className="flex items-center w-full">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <ReactCountryFlag
              className="emojiFlag flex-none"
              countryCode={selectedOption.code}
              style={{
                fontSize: "1.5em",
                lineHeight: "1.5em",
              }}
            />
            <span className="text-black ml-1">{selectedOption.dial_code}</span>
          </div>
          <input
            className="text-black outline-none no-spinners w-full"
            type="number"
            defaultValue="1834026012"
            onChange={(e)=>handlePhoneNumber(e)}
          />
        </div>
      </div>

      {isOpen && (
        <div className="absolute mt-2 w-full rounded-md outline outline-2 outline-offset-0 outline-blue-500 h-[400px] overflow-y-auto no-scrollbar">
          <ul>
            {options.map((country, index) => (
              <li
                key={index}
                className={`px-4 py-1 m-[2px] cursor-pointer rounded-lg text-black hover:text-white ${
                  selectedOption.code === country.code
                    ? "text-white bg-blue-400"
                    : "hover:bg-[#0094ff]"
                }`}
                onClick={() => {
                  handleOptionClick(country.code);
                  setIsOpen(false);
                }}
              >
                <div className="flex items-center">
                  <span className="mr-2">
                    <ReactCountryFlag countryCode={country.code} svg />
                  </span>
                  {`${country.name} (${country.dial_code})`}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
