import React from "react";
import "./Sidebar.css"
import { NavLink,Link } from "react-router-dom";
import {RiHomeFill} from "react-icons/ri"
import {IoIosArrowForward} from "react-icons/io"

const Sidebar = ({user, closeToggle}) => {
  const handleSidebar = ()=>{
    if(closeToggle) closeToggle(false)
  }
  return (
   <div className="flex flex-col ml-3 ">
    <Link to="/" onClick={handleSidebar} >
    <img src="/Assets/camera.svg" alt="" />
    </Link>
   </div>
  )
};

export default Sidebar;
