import axios from 'axios'

const API_URL = '/api/'

//Register user
const registerUser = async (userData) => {
    const response = await axios.post(API_URL + 'user/register', userData);
    if (response.status == 200) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data;
}

//Register organizer
const registerOrganizer = async (userData) => {
    const response = await axios.post(API_URL + "organizer/register", userData);
    if (response.status == 200) {
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

//Logout user
const logoutUser = async () => {
    const response = await axios.delete(API_URL + 'user/logout');
    if (response.status != 200) {
        return response.data;
    }
    localStorage.removeItem('user');
}

const updateUser = async (id) => {
    console.log("test");
    const response = await axios.post(API_URL + 'user/personal-info', id)
    if (response.status !== 400) {
        localStorage.setItem('user', JSON.stringify(response.data.message))
    }
    return response.data.message; 
}

const authService = {
    registerUser, registerOrganizer, loginUser, updateUser, logoutUser
}

export default authService