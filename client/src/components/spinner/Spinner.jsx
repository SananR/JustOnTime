import React from "react";
import {DotLoader} from "react-spinners";
import "./spinner.css"

function Spinner(props) {
    const override = {
        opacity: "0.75",
        position: "relative"
    };
    if (!props.loading) return null;
    else return (
        <div id="spinner-container" className="position-absolute w-100 h-100 d-flex justify-content-center align-items-center">
            <DotLoader color={props.color} loading={props.loading} size={props.size} css={override} />
        </div>
    )
}

export default Spinner