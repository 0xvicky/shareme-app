import React from "react";
import "./Sidebar.css"
import { NavLink, Link } from "react-router-dom";
import { RiHomeFill } from "react-icons/ri"
import { IoIosArrowForward } from "react-icons/io"

const Sidebar = ({ user, closeToggle }) => {

  const isActiveStyle = "flex gap-2 items-center border-r-2  font-bold bg-gradient-to-r from-slate-400 border-black capitalize"
  const isNotActiveStyle = "flex gap-2 items-center capitalize "

  const categories = [
    { name: "animals" },
    { name: "gaming" },
    { name: "coding" },
    { name: "cars" },
    { name: "photography" },
    { name: "savita" }
  ]
  const handleSidebar = () => {
    if (closeToggle) closeToggle(false)
  }
  return (
    <div className="flex flex-col bg-gray-100 pt-3 h-full">
      <Link to="/" onClick={handleSidebar} className="py-3">
        <div className="flex items-center ">
          <img src="/Assets/camera.svg" className="mr-3" />
          <p className="font-bold bg-gread">Pinsta</p>App
        </div>
      </Link>
      <div className="flex flex-col gap-4 mt-3  h-screen">

        <NavLink to="/" className={({ isActive }) => {
          return (
            isActive ? isActiveStyle : isNotActiveStyle
          )
        }} onClick={handleSidebar}><RiHomeFill />home</NavLink>

        <h3 className="font-bold ">Discover Categories</h3>
        {
          categories.map((item, index) => {
            return <NavLink to={`/categories/${item.name}`}
              className={({ isActive }) => {
                return (
                  isActive ? isActiveStyle : isNotActiveStyle
                )
              }}
              onClick={handleSidebar}
              key={index}
            >
              {item.name}
            </NavLink>
          })
        }

      </div>

      <Link to={`user-profile/${user?._id}`} onClick={handleSidebar}>
        <div className="mb-4 flex items-center gap-4 font-bold shadow-md shadow-slate-700 w-fit p-3 rounded-lg">
          <img src={user?.image} alt="" className="rounded-full h-10 w-10" />
          <h3>{user?.username}</h3>
        </div>
      </Link>
    </div>
  )
};

export default Sidebar;
