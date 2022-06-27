import React from "react";
import VerifyEventForm from "../../components/admin/verifyEvent/VerifyEventForm";

import VerifyOrganizerForm from "../../components/admin/verifyOrganizer/VerifyOrganizerForm";


function AdminDashboard() {
    return (
        <div className="AdminDashboard">
            <VerifyOrganizerForm/>
            <VerifyEventForm/>
        </div>
    );
}

export default AdminDashboard