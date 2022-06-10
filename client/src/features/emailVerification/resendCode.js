import axios from 'axios'

const API_URL = 'http://localhost:3000/api'

//resend code to the user
const resendCode = async () => {
    const user = {
        email: "youomachi@gmail.com"
    }
    try {
        const response = await axios.post(API_URL + '/organizer/resendcode', user);
        console.log(response.data);
    }
    catch(err){
        console.error(err);
    }
}

export { resendCode  }