import React from "react";

export const OrangeBtn = ({ text, type = "button" }: any) => {
  return (
    <button
      className="px-14 py-2 text-lg font-semibold bg-orange-400 text-white rounded-md"
      type={type}
    >
      {text}
    </button>
  );
};
