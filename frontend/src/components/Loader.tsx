import React from "react";

const Loader = () => {
  return (
    // <div className="flex justify-center items-center w-[100px] h-[100px] relative">
    <div className="flex justify-center items-center w-full h-full relative">
      <div className="w-[75px] h-[75px] border-solid border-8 border-gray-300 border-t-teal-500 rounded-full animate-spin"></div>
    </div>

  );
};

export default Loader;
