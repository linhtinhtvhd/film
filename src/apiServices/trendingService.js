import * as request from '../utils/request';
import api from '../assets/Api';
const Trending = async (type = 'all', time = 'day') => {
    try {
        const res = await request.get(`trending/${type}/${time}`, {
            params: {
                api_key: `${api.key}`,
            },
        });
        return res.results;
    } catch (error) {}
};
export default Trending;
