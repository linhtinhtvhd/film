import * as request from '~/utils/request';
import api from '~/assets/Api';
const MvLatest = async () => {
    try {
        const res = await request.get(`movie/latest`, {
            params: {
                api_key: `${api.key}`,
                language: 'en-US',
            },
        });
        return res.results;
    } catch (error) {}
};
export default MvLatest;
