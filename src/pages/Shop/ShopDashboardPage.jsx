import React from "react";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader.jsx";
import Header from "../../components/Layout/Header";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSideBar";

const ShopDashboardPage = () => {
  return (
    <div>
      <Header />

    
      <DashboardHeader />
    
      <div className="flex items-center justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={1} />
        </div>
      </div> 
    </div>
  );
};

export default ShopDashboardPage;
