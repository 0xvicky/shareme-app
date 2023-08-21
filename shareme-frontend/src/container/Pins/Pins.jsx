import React, {useState} from "react";
import {Routes, Route, useNavigate} from "react-router-dom";
import {Navbar, Feed, PinDetails, CreatePin, Search} from "../../components";
import {BsPlusSquareFill} from "react-icons/bs";

const Pins = ({user}) => {
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  return (
    <div className='px-2 m-2'>
      <div className=' p-3 '>
        <Navbar
          search={search}
          setSearch={setSearch}
          user={user && user}
        />
      </div>
      <div>
        <Routes>
          <Route
            path='/'
            element={<Feed />}
          />
          <Route
            path='/category/:categoryId'
            element={<Feed />}
          />
          <Route
            path='/pin-details/:pinId'
            element={<PinDetails user={user && user} />}
          />
          <Route
            path='/create-pin'
            element={<CreatePin user={user && user} />}
          />
          <Route
            path='/search'
            element={
              <Search
                search={search}
                setSearch={setSearch}
              />
            }
          />
        </Routes>
      </div>
      <div className='md:hidden w-full flex justify-center p-2  bg-white rounded-md bottom-0 fixed'>
        <BsPlusSquareFill
          fontSize={40}
          className='cursor-pointer shadow-black shadow-md rounded-md hover:scale-105 transition-all duration-300'
          onClick={() => {
            navigate("/create-pin");
          }}
        />
      </div>
    </div>
  );
};

export default Pins;
