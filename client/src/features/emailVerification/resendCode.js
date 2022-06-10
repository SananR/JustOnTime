import axios from 'axios'

const API_URL = 'api/'

//Register user
const resendCode = async (userData) => {
    try {
        const response = await axios.post(API_URL + 'organizer/resendcode');
        console.log(response.data);
    }
    catch(err){
        console.error(err);
    }
}

export { resendCode  }