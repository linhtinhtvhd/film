import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:3001/',
    headers: {
        'content-type': 'application/json; charset=UTF-8',
        // 'access-control-allow-origin': '*',
        'access-control-expose-headers': '*',
    },
    withCredentials: true,
});
