import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:3001/api/comments/',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': true,
    },
});
