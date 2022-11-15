import React from 'react'
import { AiFillCloseCircle } from 'react-icons/ai'

import './tagNode.module.css'

function TagNode(props) {

    return (
        <div id="tag-container">
            <span className="clickable close-icon mt-2" data-effect="fadeOut" onClick={() => props.removeTag(props.text)}><AiFillCloseCircle color={"grey"} size={25}/></span>
            <div id="node" className='p-2 mx-3'>{props.text}</div>
        </div>
    )
}

export default TagNode