import React, {useEffect, useState} from "react";
import {useSelector, useDispatch, getState} from 'react-redux'
import { store } from "../../store";
import { loadOrganizers } from "../../features/verifyOrganizers/verifyOrganizerSlice"
import VerifyOrganizerNode from './node/verifyOrganizerNode'
import './verifyOrganizerForm.css'


function VerifyOrganizerForm(props){
    
    const dispatch = useDispatch();

    const {data, isLoading, isError, isSuccess, message} = useSelector((state) => state.verifyOrganizer)

    
    useEffect(() => {
        dispatch(loadOrganizers())
    }, [])
    
    const organizerList = () => {
        const {data, isLoading, isError, isSuccess, message} = useSelector((state) => state.verifyOrganizer)

        console.log(data)
        console.log(typeof(data))
        if (!data.users){ return }
        const renderedList = data.users.map(organizer => {
            return <VerifyOrganizerNode name={organizer.userInfo.firstName} email={organizer.userInfo.email}/>
        })

        return renderedList
    }

    function handleOnclick(e){
        e.preventDefault()
        store.dispatch(loadOrganizers())
    }

    return (
        <div id="verify-organizer-container" class="mt-5 mb-5 p-5 shadow-lg container">
            <h1 id="verify-organizer-text" class="p-5 text-center"><strong>List of Organizers to Verify</strong></h1>
            {organizerList()}
        </div>
    )
}

export default VerifyOrganizerForm