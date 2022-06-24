import React, {useEffect, useState} from "react";
import {useSelector, useDispatch, getState} from 'react-redux'
import { loadOrganizers } from "../../features/verifyOrganizers/verifyOrganizerSlice"
import VerifyOrganizerNode from './node/verifyOrganizerNode'
import './verifyOrganizerForm.css'


function VerifyOrganizerForm(props){
    
    const dispatch = useDispatch();

    // const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.verifyOrganizer)

    
    useEffect(() => {
        dispatch(loadOrganizers())
    }, [])
    
    const {data, isLoading, isError, isSuccess, message} = useSelector((state) => state.verifyOrganizer)

    console.log(data)
    console.log(typeof(data))
    // return <VerifyOrganizerNode name="Yuto Omachi" email={organizers.userInfo.firstName}/>
    if (!data.users){ return }
    const renderedList = data.users.forEach(organizer => {
        return <VerifyOrganizerNode name={organizer.userInfo.firstName} email={organizer.userInfo.email}/>
    })

    return renderedList

}

export default VerifyOrganizerForm