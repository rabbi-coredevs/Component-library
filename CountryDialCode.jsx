import { useState } from "react";
import countryCodeData from "./countryCodes.json";
import CustomDropdown from "./CustomDropDown";


const CountryDialCode = () => {
  const [selectedCountry, setSelectedCountry] = useState({
    name: "Bangladesh",
    dial_code: "+880",
    code: "BD",
  });
  const [isOpen, setIsOpen] = useState(false);
  const countries = countryCodeData.countries;
//   const dial_codes =  countries.map(c=>console.log(c.dial_code));

  const handleOptionClick = (value) =>{
    const country = countries.find((country) => country.code === value);
    setSelectedCountry(country);
    setIsOpen(false);
  }

  const handlePhoneNumber = (e) =>{
    // console.log(e.target.value);
    const phoneNumber = selectedCountry.dial_code+e.target.value;
    console.log(phoneNumber);
    alert(phoneNumber);
  }

  return (
    <div>
        <CustomDropdown 
        options={countries}
        selectedOption={selectedCountry}
        setSelectedOption={setSelectedCountry}
        handleOptionClick={handleOptionClick}
        handlePhoneNumber={handlePhoneNumber}
        defaultValue={+9145342756723}
        />
    </div>
  )
};

export default CountryDialCode;
