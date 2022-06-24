import React, {useEffect, useState} from "react";
import {useSelector, useDispatch, getState} from 'react-redux'
import VerifyOrganizerForm from "../../components/admin/verifyOrganizer/VerifyOrganizerForm";


function AdminDashboard() {

    return (
        <div className="AdminDashboard">
            <VerifyOrganizerForm/>
        </div>
    );
}

export default AdminDashboard