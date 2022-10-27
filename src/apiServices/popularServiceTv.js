import * as request from '../utils/request';
import api from '../assets/Api';
const TvPopular = async () => {
    try {
        const res = await request.get(`tv/popular`, {
            params: {
                api_key: `${api.key}`,
                language: 'en-US',
            },
        });
        return res.results;
    } catch (error) {}
};
export default TvPopular;
