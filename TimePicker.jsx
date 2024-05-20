import { useCallback, useEffect, useRef, useState } from "react";
import { FaRegClock } from "react-icons/fa";

function getCurrentTime() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  // Convert 24-hour format to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; 

  // Pad minutes with leading zero if less than 10
  const currentTime = {
    hours,
    minutes,
    ampm,
  };
  return currentTime;
}

const CustomTimePick = ({ onChange = () => {} }) => {
  const initialTime = getCurrentTime();
  const timePickerRef = useRef(null);
  const [hours, setHours] = useState(initialTime.hours);
  const [minutes, setMinutes] = useState(initialTime.minutes);
  const [ampm, setAmPm] = useState(initialTime.ampm);
  const [isOpen, setIsOpen] = useState(false);
  const [wasOpen, setWasOpen] = useState(false); 

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

const handleClickOutside = useCallback((event) => {
    if (timePickerRef.current && !timePickerRef.current.contains(event.target)) {
      setIsOpen(false);
      setWasOpen(isOpen); 
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen && wasOpen) {
      onChange({ hours, minutes, ampm });
    }
    setWasOpen(isOpen); // Update wasOpen to match isOpen after handling the effect
  }, [isOpen, wasOpen, hours, minutes, ampm, onChange]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);


  return (
    <div className={`pt-2`} ref={timePickerRef}>
      <div className="flex justify-between items-center px-4 h-10 rounded bg-[#121a27] select-none cursor-pointer w-44"
      onClick={toggleDropdown}
      >
        <div className="text-white">
          {/* {hours.toString().padStart(2, "0") + ':' + minutes.toString().padStart(2, "0") + ' ' + ampm} */}
          {
            hours !== '' ?hours.toString().padStart(2, "0") + ':' + minutes.toString().padStart(2, "0") + ':' + ampm : '--'+':'+'--'+'  '+'--'
          }
        </div>
        <div className="cursor-pointer text-white">
          <FaRegClock />
        </div>
      </div>
      {isOpen && (
        <div className="absolute z-10 bg-[#121a27] mt-2 rounded">
          <div className="flex justify-center p-2 h-80">
            <ul className="overflow-y-auto no-scrollbar">
              {[...Array(12).keys()].map((_, index) => {
                const hour = (initialTime.hours + index - 1) % 12 + 1;
                return (
                  <li
                    key={index}
                    className={`px-4 py-1 mt-[2px] cursor-pointer rounded-lg text-white ${
                      hours === hour
                        ? "text-[#f5f5f5] bg-blue-500"
                        : "hover:bg-blue-300"
                    }`}
                    onClick={() => setHours(hour)}
                  >
                    {hour.toString().padStart(2, "0")}
                  </li>
                );
              })}
            </ul>

            <ul className="overflow-y-auto no-scrollbar mx-1">
              {[...Array(60).keys()].map((_, index) => {
                const minute = (initialTime.minutes + index) % 60;
                return (
                  <li
                    key={index}
                    className={`px-4 py-1 mt-[2px] cursor-pointer rounded-lg text-white ${
                      minutes === minute
                        ? "text-[#f5f5f5] bg-blue-500"
                        : "hover:bg-blue-300"
                    }`}
                    onClick={() => setMinutes(minute)}
                  >
                    {minute.toString().padStart(2, "0")}
                  </li>
                );
              })}
            </ul>
            <ul>
              {["AM", "PM"]
                .sort((a, b) => {
                  if (a === initialTime.ampm) return -1;
                  if (b === initialTime.ampm) return 1;
                  return 0;
                })
                .map((value, index) => (
                  <li
                    key={index}
                    className={`px-4 py-1 mt-[2px] cursor-pointer rounded-lg text-white ${
                      ampm === value
                        ? "text-[#f5f5f5] bg-blue-500"
                        : "hover:bg-blue-300"
                    }`}
                    onClick={() => setAmPm(value)}
                  >
                    {value}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomTimePick;