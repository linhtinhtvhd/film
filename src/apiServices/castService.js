import * as request from '../utils/request';
import api from '~/assets/Api';
const Cast = async (type = 'movie', time = 'day', id) => {
    try {
        const res = await request.get(`${type}/${id}/casts`, {
            params: {
                api_key: `${api.key}`,
            },
        });
        return res.results;
    } catch (error) {}
};
export default Cast;
