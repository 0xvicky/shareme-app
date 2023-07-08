import React from "react";
import "./SignIn.css"
import {GoogleLogin} from "react-google-login"
import {FcGoogle} from "react-icons/fc"
import { useNavigate } from "react-router-dom";


const SignIn = () => {

  const handleSignIn = ()=>{
    console.log("Signed in ....")
  }

  return (
    <>
     <div className="parent flex flex-col justify-center items-center h-screen ">
      <div className="relative w-full h-full">
     <video
     src="/Assets/intro.mp4"
     autoPlay
     muted
     loop
     type="video/mp4"
     controls={false}
     className=" h-full w-full object-cover">
     </video>
     <div className="absolute flex flex-col justify-center items-center top-0 bottom-0 left-0 right-0 bg-blackOverlay">
     <div className="flex text-white justify-center items-center">
     <img src="/Assets/camera.svg" className="mr-3"/><p className="font-bold ">Pinsta</p>App
     </div>

     <GoogleLogin
     clientId={process.env.GOOGLE_REACT_OAUTH_CRED}
     render={(renProps)=>(
      <button className="flex justify-center items-center mt-3 bg-white p-3 " onClick={renProps.onClick} disabled={renProps.disabled} type="button">
     <FcGoogle className="mr-3"/>Sign In With Google
     </button>
     )}
     onSuccess={handleSignIn}
     onFailure={handleSignIn}
     cookiePolicy="single_host_origin"
     >
     </GoogleLogin>
     </div>
      </div>
     </div>
    </>
  )
};

export default SignIn;


/**
  <div className="flex text-white justify-center items-center">
     <img src="/Assets/camera.svg" className="mr-3"/><p className="font-bold ">ShareMe</p>App
     </div>
     <button className="flex justify-center items-center mt-3 bg-white p-3 ">
     <FcGoogle className="mr-3"/>SignIn With Google
     </button>

 */