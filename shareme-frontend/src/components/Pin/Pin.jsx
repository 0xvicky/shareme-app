import React, {useState} from "react";
import "./Pin.css";
import {useNavigate} from "react-router-dom";
import {FiDownload} from "react-icons/fi";

import {urlFor} from "../../client";
import {fetchUser} from "../../utils/fetchUser";

const Pin = ({pin: {image, postedBy, _id, save}}) => {
  const [pinHovered, setpinHovered] = useState(false);

  const navigate = useNavigate();
  const userInfo = fetchUser();

  const isAlreadySaved = !!save?.filter(item => item.postedBy._id === userInfo.googleId); //true or false
  //save->[]
  //1->[2,4,1]=>  save.filter()->[1].length->!!1->true
  //3->[2,4,1]=>  save.filter()->[].length->!!0->false

  return (
    <div className='m-2'>
      <div
        onMouseEnter={() => {
          setpinHovered(true);
        }}
        onMouseLeave={() => {
          setpinHovered(false);
        }}
        onClick={() => {
          navigate(`/pin-detail/${_id}`);
        }}
        className='bg-red-500 relative cursor-pointer hover:transform hover:scale-105 transition duration-300'>
        <img
          className=' border-2 border-red-500 rouned-md  w-full h-full'
          src={urlFor(image).width(250).url()}
          alt=''
        />
        {pinHovered && (
          <div
            className='absolute top-0 w-full h-full flex flex-col justify-between p-2 pt-1 pb-1 pl-1 pr-1 z-50'
            style={{height: "100%"}}>
            <div className='flex items-center justify-between'>
              <div className='flex justify-between gap-3'>
                <a
                  href={`${image?.asset?.url}?dl=`}
                  download
                  onClick={e => {
                    e.stopPropagation();
                  }}
                  className='bg-white w-10 h-10 rounded-full text-black items-center text-xl justify-center'>
                  <FiDownload />
                </a>
                {isAlreadySaved ? (
                  <button className='text-black'>Saved</button>
                ) : (
                  <button>Save</button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pin;
