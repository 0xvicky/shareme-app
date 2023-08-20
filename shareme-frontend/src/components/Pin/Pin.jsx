import React, {useState} from "react";
import "./Pin.css";
import {Link, useNavigate} from "react-router-dom";
import {MdDownloadForOffline} from "react-icons/md";
import {FaExternalLinkSquareAlt} from "react-icons/fa";
import {MdDelete} from "react-icons/md";

import {urlFor} from "../../client";
import {fetchUser} from "../../utils/fetchUser";
import {client} from "../../client";
import {v4 as uuidv4} from "uuid";
const Pin = ({pin: {image, postedBy, _id, save, destination}}) => {
  const [pinHovered, setPinHovered] = useState(false);

  const navigate = useNavigate();
  const userInfo = fetchUser();

  const isAlreadySaved = !!save?.filter(item => item?.postedBy?._id === userInfo.sub)
    ?.length; //true or false

  //save->[]
  //1->[2,4,1]=>  save.filter()->[1].length->!!1->true
  //3->[2,4,1]=>  save.filter()->[].length->!!0->false

  const handlePinSave = id => {
    if (!isAlreadySaved) {
      client
        .patch(id)
        .setIfMissing({save: []})
        .insert("after", "save[-1]", [
          {
            _key: uuidv4(),
            userId: userInfo?.sub,
            postedBy: {
              _type: "postedBy",
              _ref: userInfo?.sub
            }
          }
        ])
        .commit()
        .then(res => {
          window.location.reload();
        });
    }
  };

  const handlePinDelete = id => {
    // console.log(`Pin deleted with ID:${id}`);
    client.delete(id).then(res => {
      window.location.reload();
      // console.log(res);
    });
  };
  return (
    <div className='m-4'>
      <div
        onMouseEnter={() => {
          setPinHovered(true);
        }}
        onMouseLeave={() => {
          setPinHovered(false);
        }}
        onClick={() => {
          navigate(`/pin-details/${_id}`);
        }}
        className='relative cursor-pointer hover:transform hover:scale-105 transition duration-300'>
        <img
          className='rouned-md w-full h-full'
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
                <button
                  className='bg-red-500 text-white p-2 rounded-lg opacity-75 hover:opacity-100 outline-none hover:shadow-md'
                  type='button'>
                  {save?.length} Saved
                </button>
              ) : (
                <button
                  type='button'
                  className='bg-red-500 text-white p-2 rounded-lg opacity-75 hover:opacity-100 outline-none hover:shadow-md'
                  onClick={e => {
                    e.stopPropagation();
                    handlePinSave(_id);
                  }}>
                  Save
                </button>
              )}
            </div>
            <div className='flex justify-between items-center gap-2 w-full'>
              {destination && (
                <a
                  href={`${destination}`}
                  target='_blank'
                  rel='noreferrer'
                  className='bg-white p-2 px-2 flex items-center justify-center rounded-lg gap-2 opacity-75 hover:opacity-100 hover:shadow-md'>
                  <FaExternalLinkSquareAlt />
                  {destination.length > 20
                    ? destination.slice(8, 18)
                    : destination.slice(8)}
                </a>
              )}
              {postedBy?._id === userInfo?.sub && (
                <>
                  <button
                    type='button'
                    className='bg-white p-2 rounded-lg flex justify-center items-center opacity-75 hover:opacity-100 hover:shadow-md'
                    onClick={e => {
                      e.stopPropagation();
                      handlePinDelete(_id);
                    }}>
                    <MdDelete />
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
      <Link
        to={`user-profile/${postedBy?._id}`}
        className='flex items-center gap-2 mt-2 shadow-'>
        <img
          src={postedBy?.image}
          alt=''
          className={`rounded-full h-9 w-9 object-cover shadow-md shadow-slate-900 `}
        />

        <p className='font-semibold capitalize'>{postedBy?.username}</p>
      </Link>
    </div>
  );
};

export default Pin;
