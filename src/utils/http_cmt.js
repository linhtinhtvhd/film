import axios from 'axios';

export default axios.create({
    baseURL: 'https://moviepinklink.herokuapp.com/api/comments/',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': true,
    },
});
