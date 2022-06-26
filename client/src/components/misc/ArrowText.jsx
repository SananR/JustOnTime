import React from 'react'

import { MdOutlineKeyboardArrowRight } from "react-icons/md"

import "./arrowtext.css"

function ArrowText(props) {
    return (
        <>
            <MdOutlineKeyboardArrowRight className="arrow" color={"red"} size={100}/>
        </>
    )
}

export default ArrowText