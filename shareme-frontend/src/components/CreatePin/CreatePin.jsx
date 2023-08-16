import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Spinner} from "../index";

const CreatePin = () => {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [destination, setDestination] = useState("");
  const [image, setImage] = useState(null);
  const [isWrongImage, setIsWrongImage] = useState(true);
  const [isEmptyFields, setIsEmptyFields] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  return (
    <>
      <div className='flex flex-col items-center justify-center mt-5 lg:h-4/5'>
        {isEmptyFields && <p className='text-red-500'>Please fill in all the fields</p>}
        <div className='flex lg:flex-row flex-col items-center justify-center bg-white lg:p-5 p-3 lg:w-4/5 w-full'>
          <div className='bg-secondaryColor p-3 flex flex-0.7 w-full'>
            <div className='flex justify-center items-center border-2 border-dotted border-slate-300  p-2 w-full h-420'>
              {loading && <Spinner msg='Loading...' />}
              {isWrongImage && <p className='text-red-500'>Wrong image type</p>}
              {!image ? <></> : <p>Something Else</p>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePin;
