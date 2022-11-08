import axios from 'axios';

export default axios.create({
    baseURL: 'https://movieapilink.herokuapp.com/api/users',
    headers: {
        'Content-Type': 'application/json',
    },
});
