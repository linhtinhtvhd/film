import * as request from '../utils/request';
import api from '../assets/Api';
const MvTopRated = async () => {
    try {
        const res = await request.get(`movie/top_rated`, {
            params: {
                api_key: `${api.key}`,
                language: 'en-US',
            },
        });
        return res.results;
    } catch (error) {}
};
export default MvTopRated;
