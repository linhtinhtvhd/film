import * as request from '../utils/request';
import api from '../assets/Api';
const Genre = async (type) => {
    try {
        const res = await request.get(`genre/${type}/list`, {
            params: {
                api_key: `${api.key}`,
            },
        });
        return res.genres;
    } catch (error) {}
};
export default Genre;
