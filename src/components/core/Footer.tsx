import React from "react";

const Footer: React.FC<{}> = () => {
  return (
    <div className="w-full p-8 flex justify-center items-center flex-col ">
      <p className="text-stone-300 font-md">
        Github Repo :{" "}
        <a
          className="underline"
          href="https://github.com/Ritvyk/manufac-assignment.git"
        >
          https://github.com/Ritvyk/manufac-assignment.git
        </a>
      </p>
    </div>
  );
};

export default Footer;
