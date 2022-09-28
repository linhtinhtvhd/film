import * as request from '~/utils/request';
import api from '~/assets/Api';
const TvTopRated = async () => {
    try {
        const res = await request.get(`tv/top_rated`, {
            params: {
                api_key: `${api.key}`,
                language: 'en-US',
            },
        });
        return res.results;
    } catch (error) {}
};
export default TvTopRated;
