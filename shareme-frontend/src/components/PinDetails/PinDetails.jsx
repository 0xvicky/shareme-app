import React, {useState, useEffect} from "react";
import {useNavigate, useParams, Link} from "react-router-dom";
import {v4 as uuidv4} from "uuid";
import {client, urlFor} from "../../client";
import {pinDetailQuery, pinDetailMorePinQuery} from "../../utils/data";
import {fetchUser} from "../../utils/fetchUser";

import {MdDownloadForOffline} from "react-icons/md";

import {MasonryLayout, Spinner} from "../index";

const PinDetails = ({user}) => {
  const [pinDetail, setPinDetail] = useState(null);
  const [comment, setComment] = useState("");
  const [pins, setPins] = useState(null);
  const [isCommenting, setIsCommenting] = useState(false);

  const {pinId} = useParams();
  const userInfo = fetchUser();

  //Function to fetch the pin details when clicked on it
  const fetchPinDetails = () => {
    let query = pinDetailQuery(pinId);

    if (query) {
      client.fetch(query).then(res => {
        setPinDetail(res[0]);
        // console.log(res);
        if (res[0]) {
          query = pinDetailMorePinQuery(res[0]);
          // console.log(res);
          client.fetch(query).then(res => {
            // console.log(res);
            setPins(res);
          });
        }
      });
    }
  };

  //UseEFfect called when the pin Id changes
  useEffect(() => {
    fetchPinDetails();
  }, [pinId]);

  //Function to add comment

  const addComment = () => {
    if (comment) {
      setIsCommenting(true);
      client
        .patch(pinId)
        .setIfMissing({comments: []})
        .insert("after", "comments[-1]", [
          {
            _key: uuidv4(),
            comment,
            postedBy: {
              _type: "postedBy",
              _ref: userInfo?.sub
            }
          }
        ])
        .commit()
        .then(res => {
          setComment("");
          fetchPinDetails();
          setTimeout(() => {
            // window.location.reload();
            setIsCommenting(false);
          }, 3000);
        });
    }
  };

  if (!pinDetail) return <Spinner msg='Loading...' />;

  return (
    <>
      {pinDetail && (
        <div
          className='flex xl:flex-row flex-col m-auto bg-white'
          style={{maxWidth: "1500px", borderRadius: "32px"}}>
          <div className='flex items-center justify-center md:items-start flex-initial'>
            <img
              className='rounded-t-2xl rounded-b-xl'
              src={pinDetail?.image && urlFor(pinDetail.image).url()}
              alt='user-post'
            />
          </div>
          <div className='w-full p-5 flex-1 xl:min-w-620'>
            <div className='flex items-center justify-between'>
              <div className='flex gap-2 items-center'>
                <a
                  href={`${pinDetail.image?.asset?.url}?dl=`}
                  download
                  onClick={e => {
                    e.stopPropagation();
                  }}
                  className='bg-white w-11 h-11 flex rounded-full text-black items-center text-2xl justify-center opacity-75 hover:opacity-100 hover:shadow-md outline-none'>
                  <MdDownloadForOffline />
                </a>
              </div>
              <a
                className='font-medium shadow-md shadow-black rounded-md px-2 hover:shadow-lg hover:shadow-black transition-all duration-200'
                href={pinDetail.destination}
                target='_blank'
                rel='noreferrer'>
                {pinDetail.destination.slice(0, 30)}
              </a>
            </div>
            <div>
              <h1 className='text-4xl mt-2 font-semibold'>{pinDetail.title}</h1>
              <p className='mt-3'>{pinDetail.about}</p>
            </div>
            <Link
              to={`user-profile/${pinDetail.postedBy?._id}`}
              className='flex items-center gap-2 mt-5 rounded-l-full'>
              <img
                src={pinDetail.postedBy?.image}
                alt=''
                className={`rounded-full h-9 w-9 object-cover shadow-md shadow-slate-600 `}
              />

              <p className='font-semibold capitalize'>{pinDetail.postedBy?.username}</p>
            </Link>
            <h2 className='mt-7 text-2xl'>Comments</h2>
            <div className='flex flex-wrap mt-6 gap-3 items-center '>
              <Link to={`user-profile/${pinDetail?.postedBy?._id}`}>
                <img
                  src={pinDetail?.postedBy?.image}
                  alt=''
                  className={`rounded-full h-9 w-9 cursor-pointer `}
                />
              </Link>
              <input
                type='text'
                value={comment}
                placeholder='Add Comment'
                onChange={e => {
                  setComment(e.target.value);
                }}
                className='flex-1 border-gray-100 outline-none border-2 p-2 rounded-xl focus:border-gray-300'
              />
              <button
                type='button'
                className='bg-sky-500 text-white rounded-full px-6 py-2 font-semibold text-base outline-none disabled:bg-sky-300 transition-all duration-300'
                disabled={comment === ""}
                onClick={addComment}>
                {isCommenting ? `Posting...` : `Post`}
              </button>
            </div>
            <div className='max-h-370 overflow-y-auto'>
              {pinDetail?.comments?.map(comment => {
                return (
                  <div className='flex gap-2 mt-4 items-center'>
                    <img
                      src={comment?.postedBy.image}
                      alt=''
                      className='w-10 h-10 rounded-full cursor-pointer'
                    />
                    <div className='flex flex-col'>
                      <p className='font-semibold'>{comment?.postedBy.username}</p>
                      <p>{comment.comment}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
      {console.log(pins)}
      {pins?.length > 0 ? (
        <>
          <h2>More Pins</h2>
          <MasonryLayout pins={pins} />
        </>
      ) : (
        <>
          <Spinner msg='Loading More Pins...' />
        </>
      )}
    </>
  );
};

export default PinDetails;
