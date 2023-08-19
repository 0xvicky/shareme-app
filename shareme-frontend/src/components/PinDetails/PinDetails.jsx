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

  const {pinId} = useParams();
  const userInfo = fetchUser();

  const fetchPinDetails = () => {
    let query = pinDetailQuery(pinId);

    if (query) {
      client.fetch(query).then(res => {
        setPinDetail(res[0]);

        if (res[0]) {
          query = pinDetailMorePinQuery(res);
          client.fetch(query).then(res => {
            setPins(res);
          });
        }
      });
    }
  };

  const addComment = () => {
    client
      .patch(pinId)
      .setIfMissing({comment: []})
      .insert("after", "save[-1]", [
        {
          _key: uuidv4(),
          comment: comment,
          postedBy: {
            _type: "postedBy",
            _ref: userInfo?.sub
          }
        }
      ])
      .commit()
      .then(res => {
        setComment("");
        window.location.reload();
      });
  };

  useEffect(() => {
    fetchPinDetails();
  }, [pinId]);

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
                  className='bg-white w-8 h-8 flex rounded-full text-black items-center text-2xl justify-center opacity-75 hover:opacity-100 hover:shadow-md outline-none'>
                  <MdDownloadForOffline />
                </a>
              </div>
              <a
                href={pinDetail.destination}
                target='_blank'
                rel='noreferrer'>
                {pinDetail.destination}
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
            <div className='flex justify-between gap-4 mt-5 pb-8 p-2 border-b-2 '>
              <input
                type='text'
                value={comment}
                placeholder='Add Comment'
                onChange={e => {
                  setComment(e.target.value);
                }}
                className='outline-none text-bg w-2/3 shadow-md rounded-md p-1 py-2 caret-sky-500'
              />
              <button
                type='button'
                className='bg-sky-500 text-white px-2 p-1 rounded-md  hover:shadow-sky-500 hover:shadow-lg transition-all duration-200'
                onClick={addComment}>
                Add Comment
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
    </>
  );
};

export default PinDetails;
