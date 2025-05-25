import React from "react";
import AsyncSelect from "react-select/async";
import { StylesConfig } from "react-select";
import { selectedCoin } from "./PortfolioDialog";
import _ from "lodash";
const customStyles: StylesConfig = {
  control: (provided) => ({
    ...provided,
    backgroundColor: "#191925",
    border: "none",
    width: "100%",
    padding: "8px",
  }),
  input: (provided) => ({
    ...provided,

    color: "white",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "white",
  }),

  menu: (provided) => ({
    ...provided,
    backgroundColor: "#4e4e4e",
    borderRadius: "4px",
    width: "420px",
  }),

  menuList: (provided) => ({
    ...provided,
    backgroundColor: "black",
  }),

  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#6161D6" : "transparent",
    color: "white",
    cursor: "pointer",
    padding: "10px",
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    display: "none",
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: "white",
    padding: "0 10px",
    transform: "translateY(-50%)",
    position: "absolute",
    right: "-10px",
    top: "50%",
    width: "35px",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "white", // 🟢 Controls the selected text color
    fontWeight: "500", // Optional: makes it bold
  }),
};
export type option = {
  id: string;
  name: string;
  large: string;
  symbol: string;
};

type CoinSelectProps = {
  setSelectedCoin: React.Dispatch<React.SetStateAction<selectedCoin | null>>;
};
const CoinSelect = ({ setSelectedCoin }: CoinSelectProps) => {
  const loadOptions = async (inputValue: string) => {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/search?query=${inputValue}`
    );
    const data = await res.json();

    const options = data.coins.map((coin: option) => ({
      label: coin.name,
      value: coin.name,
      large: coin.large,
      id: coin.id,
      symbol: coin.symbol,
    }));
    return options;
  };

  const handleChange = (newValue: unknown) => {
    setSelectedCoin(newValue as selectedCoin);
  };

  const debouncedLoadOptions = _.debounce(loadOptions, 500);

  return (
    <AsyncSelect
      styles={customStyles}
      cacheOptions
      loadOptions={debouncedLoadOptions}
      defaultOptions
      placeholder="Select Coins"
      onChange={handleChange}
    />
  );
};

export default CoinSelect;
