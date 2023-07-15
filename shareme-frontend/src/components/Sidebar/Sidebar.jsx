import React from "react";
import "./Sidebar.css"
import { NavLink, Link } from "react-router-dom";
import { RiHomeFill } from "react-icons/ri"
import { IoIosArrowForward } from "react-icons/io"

const Sidebar = ({ user, closeToggle }) => {

  /******STYLES*********** */
  const isActiveStyle = "flex gap-2 items-center border-r-2 mx-2  font-bold bg-gradient-to-r from-slate-400 border-black"
  const isNotActiveStyle = ""

  /*******LOGICS********** */

  const handleSidebar = () => {
    if (closeToggle) closeToggle(false)
  }
  return (
    <div className="flex flex-col ml-3 my-7 md:hidden">
      <Link to="/" onClick={handleSidebar} className="py-3">
        <div className="flex items-center">
          <img src="/Assets/camera.svg" className="mr-3" />
          <p className="font-bold bg-gread">Pinsta</p>App
        </div>
      </Link>
      <div className="flex flex-col gap-4 mt-3">
        <NavLink to="/" className={({ isActive }) => {
          return (
            isActive ? isActiveStyle : isNotActiveStyle
          )
        }}><RiHomeFill />Home</NavLink>

        <h3>Discover Categories</h3>

      </div>
    </div>
  )
};

export default Sidebar;
