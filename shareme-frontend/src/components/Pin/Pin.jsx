import React, {useState} from "react";
import "./Pin.css";
import {useNavigate} from "react-router-dom";
import {MdDownloadForOffline} from "react-icons/md";

import {urlFor} from "../../client";
import {fetchUser} from "../../utils/fetchUser";
import {client} from "../../client";
import {v4 as uuidv4} from "uuid";
const Pin = ({pin: {image, postedBy, _id, save}}) => {
  const [pinHovered, setpinHovered] = useState(false);

  const navigate = useNavigate();
  const userInfo = fetchUser();

  const isAlreadySaved = !!save?.filter(item => item?.postedBy?._id === userInfo.googleId)
    ?.length; //true or false
  //save->[]
  //1->[2,4,1]=>  save.filter()->[1].length->!!1->true
  //3->[2,4,1]=>  save.filter()->[].length->!!0->false

  const handleSave = id => {
    if (!isAlreadySaved) {
      client
        .patch(id)
        .setIfMissing({save: []})
        .insert("after", "save[-1]", [
          {
            _key: uuidv4(),
            userId: userInfo?.googleId,
            postedBy: {
              _type: "postedBy",
              _ref: userInfo?.googleId
            }
          }
        ])
        .commit()
        .then(res => {
          window.location.reload();
        });
    }
  };

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
        className='relative cursor-pointer hover:transform hover:scale-105 transition duration-300'>
        <img
          className=' rouned-md  w-full h-full'
          src={urlFor(image).width(250).url()}
          alt=''
        />
        {pinHovered && (
          <div
            className='absolute top-0 w-full h-full flex flex-col justify-between p-2 z-50'
            style={{height: "100%"}}>
            <div className='flex items-center justify-between'>
              <div className='flex gap-2 '>
                <a
                  href={`${image?.asset?.url}?dl=`}
                  download
                  onClick={e => {
                    e.stopPropagation();
                  }}
                  className='bg-white w-8 h-8 flex rounded-full text-black items-center text-2xl justify-center opacity-75 hover:opacity-100 hover:shadow-md outline-none'>
                  <MdDownloadForOffline />
                </a>
              </div>
              {isAlreadySaved ? (
                <button className='bg-red-500 text-white p-2 rounded-lg opacity-75 hover:opacity-100 outline-none hover:shadow-md'>
                  {save?.length} Saved
                </button>
              ) : (
                <button
                  className='bg-red-500 text-white p-2 rounded-lg opacity-75 hover:opacity-100 outline-none hover:shadow-md'
                  onClick={e => {
                    e.stopPropagation();
                    handleSave(_id);
                  }}>
                  Save
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pin;
