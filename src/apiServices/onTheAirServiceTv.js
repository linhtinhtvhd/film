import * as request from '../utils/request';
import api from '../assets/Api';
const TvOnTheAir = async () => {
    try {
        const res = await request.get(`tv/on_the_air`, {
            params: {
                api_key: `${api.key}`,
                language: 'en-US',
            },
        });
        return res.results;
    } catch (error) {}
};
export default TvOnTheAir;
