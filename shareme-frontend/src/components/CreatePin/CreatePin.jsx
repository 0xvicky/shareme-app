import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {client} from "../../client";
import {fetchUser} from "../../utils/fetchUser";
import {categories} from "../../utils/data";

import {Spinner} from "../index";
import {FaCloudUploadAlt} from "react-icons/fa";
import {MdDelete} from "react-icons/md";

const CreatePin = () => {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");

  const [category, setCategory] = useState("");
  const [destination, setDestination] = useState("");
  const [image, setImage] = useState(null);
  const [isWrongImage, setIsWrongImage] = useState(false);
  const [isEmptyFields, setIsEmptyFields] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const userInfo = fetchUser();

  const uploadImage = e => {
    let allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/svg",
      "image/tiff"
    ];
    let {type, name} = e.target.files[0];
    if (allowedTypes.includes(type)) {
      setIsWrongImage(false);
      setLoading(true);
      setLoading(true);

      client.assets
        .upload("image", e.target.files[0], {contentType: type, filename: name})
        .then(docs => {
          // console.log(docs);
          setImage(docs);
          setLoading(false);
        })
        .catch(e => {
          console.log(`Error occured while uploading img:${e}`);
        });
    } else {
      setIsWrongImage(true);
    }
  };

  const createPin = () => {
    if (title && about && destination && category && image?._id) {
      let doc = {
        _type: "pin",
        title,
        about,
        category,
        userId: userInfo?.sub,
        postedBy: {
          _type: "postedBy",
          _ref: userInfo?.sub
        },
        image: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: image?._id
          }
        },
        destination
      };

      client.create(doc).then(() => {
        navigate("/");
      });
    } else {
      setIsEmptyFields(true);

      setTimeout(() => {
        setIsEmptyFields(false);
      }, 3000);
    }
  };
  return (
    <>
      <div className='flex flex-col items-center justify-center mt-5 lg:h-4/5'>
        {isEmptyFields && <p className='text-red-500'>Please fill in all the fields</p>}
        <div className='flex lg:flex-row flex-col items-center justify-center bg-white lg:p-5 p-3 lg:w-4/5 w-full'>
          <div className='bg-secondaryColor p-3 flex flex-0.7 w-full'>
            <div className='flex flex-col justify-center items-center border-2 border-dotted border-slate-300  p-2 w-full h-420'>
              {loading && <Spinner msg='Loading...' />}
              {!image ? (
                <>
                  <label>
                    <div className='flex flex-col items-center justify-center h-full'>
                      <div className='flex flex-col items-center justify-center'>
                        <p className='font-bol text-3xl cursor-pointer'>
                          <FaCloudUploadAlt />
                        </p>
                        <p>Click To Upload</p>
                      </div>
                      <p className='text-zinc-400 mt-32'>
                        Use High Quality: JPG, SVG, GIF, TIFF less than 20MB
                      </p>
                    </div>
                    <input
                      type='file'
                      name='pin-image'
                      onChange={uploadImage}
                      className='w-0 h-0'
                    />
                  </label>
                </>
              ) : (
                <div className='relative h-full'>
                  <img
                    src={image?.url}
                    alt='Uploaded-image'
                    className='h-full w-full'
                  />
                  <button
                    type='button'
                    className='flex justify-center items-center absolute right-0 bottom-3 bg-white transition-all duration-300 ease-in-out opacity-75 hover:opacity-100 hover:shadow-md rounded-full p-3'
                    onClick={() => setImage(null)}>
                    <MdDelete />
                  </button>
                </div>
              )}
              {isWrongImage && <p className='text-red-500'>Wrong image type</p>}
            </div>
          </div>

          <div className='flex flex-1 flex-col gap-6 mt-5 w-full lg:pl-5'>
            <input
              type='text'
              value={title}
              placeholder='Add your title here'
              onChange={e => {
                setTitle(e.target.value);
              }}
              className='outline-none sm:text-xl font-bold border-2 border-gray-200 p-2'
            />
            {userInfo && (
              <div className='flex gap-3 items-center my-2'>
                <img
                  src={userInfo?.picture}
                  alt=''
                  className='h-9 w-9 rounded-full shadow-md'
                />
                <p className='font-bold'>{userInfo?.name}</p>
              </div>
            )}
            <input
              type='text'
              value={about}
              placeholder='About the post'
              onChange={e => {
                setAbout(e.target.value);
              }}
              className='outline-none sm:text-lg border-2 border-gray-200 p-2'
            />
            <input
              type='text'
              value={destination}
              placeholder='Destination link of post'
              onChange={e => {
                setDestination(e.target.value);
              }}
              className='outline-none sm:text-lg border-2 border-gray-200 p-2 '
            />
            <div className='flex flex-col'>
              <p className='font-semibold text-lg sm:text-xl mb-3'>Choose Category</p>
              <select
                onChange={e => {
                  setCategory(e.target.value);
                }}
                className='outline-none capitalize'>
                <option
                  value='others'
                  className='sm:text-bg bg-white'>
                  Select Category
                </option>
                {categories.map((item, index) => {
                  return (
                    <option
                      key={index}
                      value={item.name}
                      className='sm:text-bg bg-white outline-none capitalize'>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className='flex justify-end items-end'>
              <button
                type='button'
                onClick={createPin}
                className='bg-green-500 p-2 px-2 text-white font-semibold rounded-md shadow-sm shadow-black hover:shadow-lg hover:shadow-green-500 transition-all duration-300'>
                Save Pin
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePin;
