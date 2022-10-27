import * as request from '../utils/request';
import api from '../assets/Api';
const TvAringToDay = async () => {
    try {
        const res = await request.get(`tv/airing_today`, {
            params: {
                api_key: `${api.key}`,
                language: 'en-US',
            },
        });
        return res.results;
    } catch (error) {}
};
export default TvAringToDay;
