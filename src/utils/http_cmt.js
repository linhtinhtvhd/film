import axios from 'axios';

export default axios.create({
    baseURL: 'https://filmpinklink.herokuapp.com/api/comments/',
    headers: {
        'Content-Type': 'application/json',
    },
});
