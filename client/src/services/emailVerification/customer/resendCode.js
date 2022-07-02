import axios from 'axios'

const API_URL = 'http://localhost:3000/api'

//resend code to the user
const resendCode = async () => {
    // expect the email to be in the store somehow
    const user = {
        email: "youomachi@gmail.com"
    }
    const response = await axios.post(API_URL + '/customer/resendcode', user);
    console.log(response.data);
    return response.data

}

export { resendCode  }