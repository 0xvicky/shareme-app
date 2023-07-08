import React from "react";
import "./SignIn.css"
import {GoogleLogin} from "react-google-login"
import {FcGoogle} from "react-icons/fc"
import { useNavigate } from "react-router-dom";


const SignIn = () => {
  return (
    <>
     <div className="parent flex flex-col justify-center items-center h-screen bg-slate-400">
     <div className="flex text-white justify-center items-center">
     <img src="/Assets/camera.svg" className="mr-3"/><p className="font-bold ">ShareMe</p>App
     </div>
     <button className="flex justify-center items-center mt-3 bg-white p-3 ">
     <FcGoogle className="mr-3"/>SignIn With Google
     </button>
     </div>
    </>
  )
};

export default SignIn;
