import React, {useEffect, useState} from "react";
import {useSelector, useDispatch, getState} from 'react-redux'
import VerifyOrganizerForm from "../../components/admin/VerifyOrganizerForm";
import { loadOrganizers } from "../../features/verifyOrganizers/verifyOrganizerSlice"


function AdminDashboard() {

    // const dispatch = useDispatch();

    // const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.verifyOrganizer)

    
    // React.useEffect(() => {
    //     console.log({user, isLoading, isError, isSuccess, message})
    //     dispatch(loadOrganizers())
    // }, [])


    return (
        <div className="AdminDashboard">
            <VerifyOrganizerForm/>
        </div>
    );
}

export default AdminDashboard