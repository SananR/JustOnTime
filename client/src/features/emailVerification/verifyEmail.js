import axios from 'axios'

const API_URL = 'http://localhost:3000/api'

//resend code to the user
const verifyEmail = async (email, token) => {
    try {
        const requestURL = API_URL + '/organizer/verifyemail/' + email + "/" + token;
        console.log(requestURL)
        const response = await axios.post(requestURL);
        return response;
    }
    catch(err){
        console.error(err);
        return err;
    }
}

export { verifyEmail }