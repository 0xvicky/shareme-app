import React from "react";
import "./Pin.css"
import { urlFor } from "../../client";
const Pin = ({ pin: { image, postedBy, _id } }) => {
    return <div>
        <img src={urlFor(image).width(250).url()} alt="" />
    </div>;
};

export default Pin;
