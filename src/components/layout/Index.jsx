import { React, useEffect, useState } from "react";
import Header from "../header/Index";
import { Outlet, useNavigate } from "react-router-dom";
import Sitebar from "../sitebar/Index";

const Adminlayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
   const token = localStorage.getItem("token");
 useEffect(()=>{
   if(!token){
     navigate("/login")
   }else{
    navigate("/statistics")
   }
 },[token])
  return (
    <>
      <Header collapsed={collapsed} setCollapsed={setCollapsed} />
      <Sitebar collapsed={collapsed} />
      <div>
        <main
          className={`transition-all duration-300 ${
            collapsed ? "ml-[90px]" : "ml-[258px] mr-[6px]"
          } mt-[10px]`}
        >
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Adminlayout;
