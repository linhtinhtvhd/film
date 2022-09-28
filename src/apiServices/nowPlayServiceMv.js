import * as request from '~/utils/request';
import api from '~/assets/Api';
const MvNowPlay = async () => {
    try {
        const res = await request.get(`movie/now_playing`, {
            params: {
                api_key: `${api.key}`,
                language: 'en-US',
            },
        });
        return res.results;
    } catch (error) {}
};
export default MvNowPlay;
