import axios from 'axios';

export default axios.create({
    baseURL: 'https://film-pinklink.herokuapp.com/api/users/',
    headers: {
        'Content-Type': 'application/json',
    },
});
