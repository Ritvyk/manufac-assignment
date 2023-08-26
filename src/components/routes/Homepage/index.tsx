import React from "react";
import { IHomepageProps } from "./interface";
import Header from "../../core/Header";
import Footer from "../../core/Footer";
import { useAppSelector } from "../../../redux_app/hooks";
import Table from "./components/Table";

const Homepage: React.FC<IHomepageProps> = () => {
  const wineData = useAppSelector((state) => state.root.wineData);
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
