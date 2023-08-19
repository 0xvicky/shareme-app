import React, {useState, useEffect} from "react";
import {useNavigate, useParams, Link} from "react-router-dom";
import {v4 as uuidv4} from "uuid";
import {client, urlFor} from "../../client";
import {pinDetailQuery, pinDetailMorePinQuery} from "../../utils/data";

import {MdDownloadForOffline} from "react-icons/md";
import {MasonryLayout, Spinner} from "../index";

const PinDetails = ({user}) => {
  const [pinDetail, setPinDetail] = useState(null);
  const [comment, setComment] = useState(null);
  const [pins, setPins] = useState(null);

  const {pinId} = useParams();

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
  useEffect(() => {
    fetchPinDetails();
  }, [pinId]);

  if (!pinDetail) return <Spinner msg='Loading...' />;
  console.log(pinDetail);
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
            <div className='max-h-370 overflow-y-auto'></div>
          </div>
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
      )}
    </>
  );
};

export default PinDetails;
