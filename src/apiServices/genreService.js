import * as request from '~/utils/request';
import api from '~/assets/Api';
const Genre = async (type = 'movie', time = 'day', id) => {
    try {
        const res = await request.get(`genre/${type}/list`, {
            params: {
                api_key: `${api.key}`,
            },
        });
        return res;
    } catch (error) {}
};
export default Genre;
