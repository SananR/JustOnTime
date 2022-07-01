import axios from 'axios'

const API_URL = '/api/'

//Register user
const registerUser = async (userData) => {
    const response = await axios.post(API_URL + 'user/register', userData);
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data;
}

//Login user
const loginUser = async (userData) => {
    const response = await axios.post(API_URL + 'user/login', userData);
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data;
}

const updateUser = async (id) => {
    const response = await axios.post(API_URL + 'user/personal-info', id)
    console.log(response.data.message)
    if (response.data.status !== 400) {
        localStorage.setItem('user', JSON.stringify(response.data.message))
    }
    return response.data.message; 
}

const authService = {
    registerUser, loginUser, updateUser
}

export default authService