import React, { useState, useEffect, useRef } from "react";
import "./Home.css"
import { HiMenu } from "react-icons/hi"
import {AiFillCloseCircle} from "react-icons/ai"
import { Routes, Route, useNavigate, Link } from "react-router-dom"
import { Sidebar, UserProfile } from "../../components"
import Pins from "../Pins/Pins";
import { userQuery } from "../../utils/data";
import { client } from "../../client";

const Home = () => {
  const [toogleSideBar, setToogleSideBar] = useState(false);
  const [user, setUser] = useState()
  const scrollRef = useRef(null)

  const userInfo = localStorage.getItem('user') !== "undefined" ? JSON.parse(localStorage.getItem('user')) : localStorage.clear()

  useEffect(() => {
    const query = userQuery(userInfo?.sub);
    client.fetch(query).then(res => {
      setUser(res[0])//gets the user data stored in sanity datastore
    })
  }, []);

  return (
    <>
      <div className="flex md:flex-row flex-col transition-height duration-150 ease-linear p-2">
        <div className="hidden md:flex h-screen flex-initial">
          <Sidebar user ={user && user} />
        </div>
        <div className="md:hidden flex bg-gradient-to-br from-purple-700 to-sky-500  items-center justify-between p-2 w-full shadow-md">
          <HiMenu fontSize={36} onClick={() => {
            setToogleSideBar(true)
          }} />

          <Link to="/">
            <div className="flex items-center">
              <img src="/Assets/camera.svg" className="mr-3" />
              <p className="font-bold ">Pinsta</p>App
            </div>
          </Link>

          <Link to={`user-profile/${user?._id}`}>
            <img src={user?.image} className="mr-3 rounded-full h-10 w-10 " />
          </Link>
        </div>
 {
  toogleSideBar &&
 ( <>
<div className="fixed w-5/6 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">

  <div className="absolute w-full flex justify-end items-center p-2">
<AiFillCloseCircle fontSize={30} className="cursor-pointer" onClick={()=>{setToogleSideBar(false)}}/>
  </div>
  <Sidebar user ={user && user}/>
</div>
  </>)
 }

<div className="pb-2 bg-red-500 flex-1 h-screen overflow-y-scroll" ref ={scrollRef}>
<Routes>
<Route path={`/user-profile/${user?._id}`} element = {<UserProfile/>} />
<Route path="/*" element = {<Pins user={user && user}/>}/>
</Routes>
</div>
      </div>
    </>
  )
};

export default Home;
