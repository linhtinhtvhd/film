import * as request from '../utils/request';
import api from '../assets/Api';
const MvPopular = async () => {
    try {
        const res = await request.get(`movie/popular`, {
            params: {
                api_key: `${api.key}`,
                language: 'en-US',
            },
        });
        return res.results;
    } catch (error) {}
};
export default MvPopular;
