import React, {useState, useEffect, useRef} from "react";
import "./Home.css";
import {HiMenu} from "react-icons/hi";
import {AiFillCloseCircle} from "react-icons/ai";
import {Routes, Route, useNavigate, Link} from "react-router-dom";
import {CreatePin, Sidebar, UserProfile} from "../../components";
import Pins from "../Pins/Pins";
import {userQuery} from "../../utils/data";
import {client} from "../../client";
import {fetchUser} from "../../utils/fetchUser";

const Home = () => {
  const [toggleSideBar, setToggleSideBar] = useState(false);
  const [user, setUser] = useState();
  const scrollRef = useRef(null);

  const userInfo = fetchUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo === null) {
      navigate("/signin");
    } else {
      const query = userQuery(userInfo?.sub);
      client.fetch(query).then(res => {
        console.log(res);
        setUser(res[0]); //gets the user data stored in sanity datastore
      });
    }
  }, []);

  return (
    <>
      <div className='flex md:flex-row flex-col transition-height duration-150 ease-linear p-2'>
        <div className='hidden md:flex h-screen flex-initial'>
          <Sidebar user={user && user} />
        </div>
        <div className='md:hidden flex  items-center justify-between p-2 w-full shadow-md '>
          <HiMenu
            fontSize={36}
            onClick={() => {
              setToggleSideBar(true);
            }}
            className='cursor-pointer w-fit'
          />
          <Link to='/'>
            <div className='flex items-center'>
              <img
                src='/Assets/camera.svg'
                className='mr-3'
              />
              <p className='font-bold '>Pinsta</p>App
            </div>
          </Link>

          <Link to={`user-profile/${user?._id}`}>
            <img
              src={user?.image}
              className='mr-3 rounded-full h-10 w-10 shadow-md shadow-slate-600 hover:shadow-slate-800'
            />
          </Link>
        </div>
        {toggleSideBar && (
          <>
            <div className='fixed w-5/6 md:hidden flex flex-col bg-slate-300 h-screen overflow-y-auto shadow-md z-10 animate-slide-in'>
              <div className='absolute w-full flex justify-end items-center p-2 '>
                <AiFillCloseCircle
                  fontSize={30}
                  className='cursor-pointer'
                  onClick={() => {
                    setToggleSideBar(false);
                  }}
                />
              </div>
              <Sidebar
                user={user && user}
                closeToggle={setToggleSideBar}
              />
            </div>
          </>
        )}

        <div
          className='pb-2 flex-1 h-screen overflow-y-scroll'
          ref={scrollRef}>
          <Routes>
            <Route
              path={`/user-profile/:userId`}
              element={<UserProfile />}
            />
            <Route
              path='/*'
              element={<Pins user={user && user} />}
            />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Home;
