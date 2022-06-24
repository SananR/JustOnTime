import React, {useEffect, useState} from "react";
import { CSSTransition } from 'react-transition-group';
import {useSelector, useDispatch, getState} from 'react-redux'
import { store } from "../../store";
import { loadOrganizers, verifyOrganizer } from "../../features/verifyOrganizers/verifyOrganizerSlice"
import VerifyOrganizerNode from './node/verifyOrganizerNode'
import './verifyOrganizerForm.css'


function VerifyOrganizerForm(props){
    
    const dispatch = useDispatch();

    const {data, isLoading, isError, isSuccess, message} = useSelector((state) => state.verifyOrganizer)

    
    useEffect(() => {
        dispatch(loadOrganizers())
    }, [])
    
    const onClick = (email) => {
        dispatch(verifyOrganizer(email))
    }

    const organizerList = () => {
        const {unverifiedOrganizers, isLoading, isError, isSuccess, message} = useSelector((state) => state.verifyOrganizer)
        if (!unverifiedOrganizers){ return }
        const renderedList = unverifiedOrganizers.map(organizer => {
            const name = organizer.userInfo.firstName + " " + organizer.userInfo.lastName
            return <VerifyOrganizerNode name={name} email={organizer.userInfo.email} onClick={() => {onClick(organizer.userInfo.email)}}/>
        })

        return renderedList
    }


    return (
        <div id="verify-organizer-container" class="mt-5 mb-5 p-5 shadow-lg container">
            <h1 id="verify-organizer-text" class="p-5 text-center"><strong>List of Organizers to Verify</strong></h1>
                <div id="organizers" class="animated fadeInDown">
                {organizerList()}
                </div>
        </div>
    )
}

export default VerifyOrganizerForm