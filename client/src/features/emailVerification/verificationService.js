import axios from 'axios'

const API_URL = '/api'

//Register user
const verifyEmail = async (email, token) => {
    const requestURL = API_URL + 'organizer/verifyemail/' + email + '/' + token;
    const response = await axios.post(requestURL, userData);
    console.log(JSON.stringify(response.data));
    return response.data;
}

const verifyEmailService = {
    verifyEmail,
}

export default verifyEmailService