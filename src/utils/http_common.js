import axios from 'axios';

export default axios.create({
    baseURL: 'https://moviepinklink.herokuapp.com/api/users',
    headers: {
        'Content-Type': 'application/json',
    },
});
