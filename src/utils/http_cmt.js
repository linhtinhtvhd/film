import axios from 'axios';

export default axios.create({
    baseURL: 'https://movieapilink.herokuapp.com/api/comments/',
    headers: {
        'Content-Type': 'application/json',
    },
});
