import axios from 'axios'

const API_URL = '/api/'

//Register user
const loadOrganizers = async () => {
    const response = await axios.get(API_URL + 'admin/getUnverifiedOrganizers');
    return response.data;
}

const OrganizerStatus = {
    REJECTED: "REJECTED",
    VERIFIED: "VERIFIED",
    SIGNUP_NOT_COMPLETE: "SIGNUP_NOT_COMPLETE",
    VERIFICATION_IN_PROGRESS: "VERIFICATION_IN_PROGRESS",
    NEEDS_RESUBMISSION: "NEEDS_RESUBMISSION"
}

//Verify Organizer
const verifyOrganizer = async (email) => {
    const body = {
        email: email,
        verificationStatus: OrganizerStatus.VERIFIED
    }
    const response = await axios.post(API_URL + 'admin/updateOrganizerStatus', body);
    console.log(response.data)
    return response.data;
}


//Verify Organizer
const rejectOrganizer = async (email) => {
    const body = {
        email: email,
        verificationStatus: OrganizerStatus.REJECTED
    }
    const response = await axios.post(API_URL + 'admin/updateOrganizerStatus', body);
    console.log(response.data)
    return response.data;
}


export {loadOrganizers, verifyOrganizer, rejectOrganizer}