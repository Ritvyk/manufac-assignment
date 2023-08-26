import React from "react";

const Header: React.FC<{}> = () => {
  return (
    <div className="w-full text-stone-300 flex justify-center items-center flex-col p-8">
      <p className="block text-lg font-bold">Manufac Assigment</p>
      <p className="text-sm block">🍷 Wine Data Visualization</p>
    </div>
  );
};

export default Header;
