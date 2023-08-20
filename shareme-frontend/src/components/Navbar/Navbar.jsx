import React from "react";
import {NavLink, Link, useNavigate} from "react-router-dom";
import {BiSearchAlt} from "react-icons/bi";
import {BsPlusSquareFill} from "react-icons/bs";

const Navbar = ({user, search, setSearch}) => {
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <div className='flex items-center justify-between shadow-md shadow-gray-300 p-3'>
      <div
        className='flex justify-between items-center '
        onClick={() => {
          navigate("/search");
        }}>
        <BiSearchAlt fontSize={30} />
        <input
          type='text'
          className='border-none outline-none p-2 caret-gray-500 '
          placeholder='Search'
          onChange={e => {
            setSearch(e.target.value);
          }}
          value={search}
        />
      </div>
      <div className=' md:flex gap-10 hidden items-center'>
        <BsPlusSquareFill
          fontSize={40}
          className='cursor-pointer shadow-black shadow-md rounded-md hover:scale-105 transition-all duration-300'
          onClick={() => {
            navigate("/create-pin");
          }}
        />
        <Link to={`user-profile/${user?._id}`}>
          <img
            src={user?.image}
            className=' rounded-full h-10 ml-10 w-10 shadow-md shadow-slate-600 hover:shadow-slate-800'
          />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
