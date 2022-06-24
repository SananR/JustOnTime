import axios from 'axios'

const API_URL = '/api/'

//Register user
const loadOrganizers = async () => {
    const response = await axios.get(API_URL + 'admin/getUnverifiedOrganizers');
    return response.data;
}

export default {loadOrganizers}