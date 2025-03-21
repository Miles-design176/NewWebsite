import React from "react";

interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

const SwitchForPricing: React.FC<SwitchProps> = ({ checked, onCheckedChange }) => {
  return (
    <button
      onClick={() => onCheckedChange(!checked)}
      className={`relative w-12 h-6 flex items-center rounded-full p-1 transition duration-300 ${
        checked ? "bg-blue-500" : "bg-gray-300"
      }`}
    >
      <div
        className={`bg-white w-5 h-5 rounded-full shadow-md transform transition duration-300 ${
          checked ? "translate-x-6" : "translate-x-0"
        }`}
      ></div>
    </button>
  );
};

export { SwitchForPricing };
