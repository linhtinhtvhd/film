import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:3001/api/users',
    headers: {
        'Content-Type': 'application/json',
    },
});
