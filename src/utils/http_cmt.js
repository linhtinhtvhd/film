import axios from 'axios';

export default axios.create({
    baseURL: 'https://film-pinklink.herokuapp.com/api/comments/',
    headers: {
        'Content-Type': 'application/json',
    },
});
