import React, {useState, useEffect} from "react";
import "./UserProfile.css";
import {AiOutlineLogout} from "react-icons/ai";
import MasonryLayout from "../MasonryLayout/MasonryLayout";

import {client} from "../../client";
import {useParams, useNavigate} from "react-router-dom";
import {userQuery, userCreatedPinsQuery, userSavedPinsQuery} from "../../utils/data";

import Spinner from "../Spinner/Spinner";
import {fetchUser} from "../../utils/fetchUser";
const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [pins, setPins] = useState(null);

  const navigate = useNavigate();
  const {userId} = useParams();
  const userInfo = fetchUser();
  let randomImage =
    "https://source.unsplash.com/1600x900/?city,night,photography,technology,game";

  const fetchUserDetails = () => {
    let query = userQuery(userId);
    client.fetch(query).then(res => {
      setUser(res[0]);
    });
  };

  useEffect(() => {
    fetchUserDetails();
  }, [userId]);

  const logout = () => {
    localStorage.clear();
  };

  // console.log(userId);
  if (!user) return <Spinner msg='Loading Profile...' />;
  return (
    <div className='relative justify-center items-center h-full pb-2 '>
      <div className='flex flex-col pb-5 '>
        <div className='relative flex flex-col mb-7 '>
          <div className='flex flex-col items-center justify-center'>
            <img
              src={randomImage}
              alt='banner-img'
              className='w-full h-370 xl:h-510 shadow-lg object-cover'
            />
            <img
              src={user.image}
              alt=''
              className='w-20 h-20 rounded-full -mt-10 shadow-md shadow-black'
            />
            <h1 className='text-3xl font-bold mt-7 text-center'>{user.username}</h1>
            <div className='absolute top-0 right-0 z-10'>
              {userId === userInfo?.sub && (
                <>
                  <div
                    className='bg-white p-2 rounded-full m-2 opacity-75 hover:opacity-100 cursor-pointer'
                    onClick={logout}>
                    <AiOutlineLogout
                      color='red'
                      fontSize={21}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
