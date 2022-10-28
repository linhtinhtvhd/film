import axios from 'axios';

export default axios.create({
    baseURL: 'https://film-pinklink.herokuapp.com/',
    headers: {
        'Content-Type': 'application/json',
    },
});
