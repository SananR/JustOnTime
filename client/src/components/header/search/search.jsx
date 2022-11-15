import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import './search.module.css'
import {useNavigate} from "react-router-dom";




function Search(){
    const [showSearch, setShowSearch] = useState(false);
    const [inputHover, setInputHover] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const handleEnter = (searchTerm) =>{
        const url = 'search/?searchTerm=' + searchTerm;
        navigate(url);
    }

    return(
            <div className="right">
                <div className={`search ${true ? "show-search" : ""} `}>
                    <button
                        onClick = {() => {
                            if(!showSearch){
                                setShowSearch(true)
                            }
                            else{
                                setShowSearch(false)
                            }
                            }}
                        onFocus={() => setShowSearch(true)}
                        onBlur={() => {
                            if (!inputHover) {
                                setShowSearch(false);
                            }
                        }}
                        >
                        <FaSearch />
                    </button>
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={({ target }) => setSearchTerm(target.value)}
                        onMouseEnter={() => setInputHover(true)}
                        onMouseLeave={() => setInputHover(false)}
                        onBlur={() => {
                            setShowSearch(false);
                            setInputHover(false);
                        }}
                        onKeyPress = {
                            event => {
                                if(event.key === 'Enter'){
                                    handleEnter(searchTerm)
                                }
                            }
                        }
                    />
                </div>
            </div>
    );
    
}

export default Search;

