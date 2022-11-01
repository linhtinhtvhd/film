import axios from 'axios';

export default axios.create({
    baseURL: 'https://filmpinklink.herokuapp.com/api/users',
    headers: {
        'Content-Type': 'application/json',
    },
});
