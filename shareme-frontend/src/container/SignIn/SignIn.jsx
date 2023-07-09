import React from "react";
import "./SignIn.css"
import { FcGoogle } from "react-icons/fc"
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const SignIn = () => {

  const handleSignIn = (res) => {
    console.log(res)
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
            <div className="flex text-white justify-center items-center mb-3">
              <img src="/Assets/camera.svg" className="mr-3" /><p className="font-bold ">Pinsta</p>App
            </div>

            <GoogleOAuthProvider
              clientId="458847142767-re2lqg9i3jk57atap59lar4aatlkrahc.apps.googleusercontent.com"

              >
              <GoogleLogin
                onSuccess={(credRes) => {
                  console.log(credRes)
                }}
                onError={() => {
                  console.log("Login Failed")
                }}
              />
            </GoogleOAuthProvider>
          </div>
        </div>
      </div>
    </>
  )
};

export default SignIn;