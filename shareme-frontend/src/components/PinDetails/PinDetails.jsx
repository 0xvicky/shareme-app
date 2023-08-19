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
        </div>
      )}
    </>
  );
};

export default PinDetails;
