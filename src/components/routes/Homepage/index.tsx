import React from "react";
import { IHomepageProps } from "./interface";
import Header from "../../core/Header";
import Footer from "../../core/Footer";
import Table from "./components/Table";

const Homepage: React.FC<IHomepageProps> = () => {
  return (
    <div className="w-full h-full">
      <Header />
      <div className="flex justify-center items-center flex-col">
        <Table />
      </div>
      <Footer />
    </div>
  );
};

export default Homepage;
