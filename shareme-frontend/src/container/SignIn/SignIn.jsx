import React from "react";
import "./SignIn.css";
import {useNavigate} from "react-router-dom";
import {GoogleOAuthProvider, GoogleLogin} from "@react-oauth/google";
import jwt_decode from "jwt-decode";

import {client} from "../../client";

const SignIn = () => {
  const navigate = useNavigate();
  const handleSignIn = res => {
    const userInfo = jwt_decode(res.credential); //Decode the credential of user to readable information

    localStorage.setItem("user", JSON.stringify(userInfo)); //store the user info in the local storage
    const {name, sub, picture} = userInfo;
    const doc = {
      _id: sub, //This _id is keyword and mandatory
      _type: "user", //This _type also
      username: name,
      image: picture
    }; //Whole doc will be added to the sanity datastore

    client.createIfNotExists(doc).then(() => {
      //This function only create the doc if it is not present in the sanity datastore.....
      navigate("/", {replace: true});
    });
  };

  return (
    <>
      <div className='parent flex flex-col justify-center items-center h-screen '>
        <div className='relative w-full h-full'>
          <video
            src='/Assets/intro.mp4'
            autoPlay
            muted
            loop
            type='video/mp4'
            controls={false}
            className=' h-full w-full object-cover'></video>
          <div className='absolute flex flex-col justify-center items-center top-0 bottom-0 left-0 right-0 bg-blackOverlay'>
            <div className='flex text-white justify-center items-center mb-3'>
              <img
                src='/Assets/camera.svg'
                className='mr-3'
              />
              <p className='font-bold '>Pinsta</p>App
            </div>

            <GoogleOAuthProvider clientId='458847142767-re2lqg9i3jk57atap59lar4aatlkrahc.apps.googleusercontent.com'>
              <GoogleLogin
                onSuccess={resCred => {
                  handleSignIn(resCred);
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
            </GoogleOAuthProvider>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
