import React from "react";
import { Rings } from "react-loader-spinner"
const Spinner = ({ msg }) => {
    return (<>
        <div className="flex flex-col  items-center">
            <Rings color="gray" />
            <h3>{msg}</h3>
        </div>
    </>
    )
};

export default Spinner;
