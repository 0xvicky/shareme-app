import React from "react";
import Masonry from "react-masonry-css";
import Pin from "../Pin/Pin";
import "./MasonryLayout.css"
const MasonryLayout = ({ pins }) => {

    const breakPoints = {
        default: 4,
        3000: 6,
        2000: 5,
        1200: 3,
        1000: 2,
        500: 1
    }

    return <div>
        <Masonry className="flex animate-slide-fwd" breakpointCols={breakPoints}>
            {
                pins?.map((pin, index) => {
                    return <Pin key={index} pin={pin} />
                })
            }
        </Masonry>
    </div>;
};

export default MasonryLayout;
