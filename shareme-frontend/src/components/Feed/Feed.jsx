import React, { useState } from "react";
import "./Feed.css"

import Spinner from "../Spinner/Spinner";
const Feed = () => {

    const [loading, setLoading] = useState(true);
    if (loading) return <Spinner msg="We are adding ideas to your feed !" />
    return <div></div>;
};

export default Feed;
