import axios from 'axios';

export default axios.create({
    baseURL: 'https://film-pinklink.herokuapp.com/',
    headers: {
        'content-type': 'application/json; charset=UTF-8',
        'access-control-allow-origin': '*',
        'access-control-expose-headers': '*',
    },
});
