import React,{useState,useEffect,useRef} from "react";
import "./Home.css"
import {HiMenu} from "react-icons/hi"
import {Routes,Route, useNavigate,Link} from "react-router-dom"
import {Sidebar, UserProfile} from "../../components"
import { userQuery } from "../../utils/data";
import { client } from "../../client";

const Home = () => {
  const [toogleBar, setToogleBar] = useState(false);
  const [user,setUser] = useState()

  const userInfo = localStorage.getItem('user')!=="undefined" ? JSON.parse(localStorage.getItem('user')) : localStorage.clear()

  useEffect(() => {
    console.log("started")
    console.log(userInfo)
   const query = userQuery(userInfo?.sub);
console.log(query)
   client.fetch(query).then(res=>{
    console.log(res)
   setUser(res[0])
   })
  }, []);

  return(
<>
<div className="flex bg-zinc-300 md:flex-row flex-col transition-height duration-150 ease-linear p-2">
<div className="hidden md:flex h-screen flex-initial">
  <Sidebar/>
</div>
<div className="md:hidden flex  items-center">
 <HiMenu fontSize={36}  onClick={()=>{
  setToogleBar(true)
 }}/>
 <Link to="/">
  <img src="/Assets/camera.svg" className="mr-3" />
 </Link>
  <p className="font-bold ">Pinsta</p>App

 <Link to={`user-profile/${user?._id}`}>
  <img src={user?.image} className="mr-3 rounded-full h-10 w-10 " />
 </Link>
</div>
</div>
</>
  )
};

export default Home;
