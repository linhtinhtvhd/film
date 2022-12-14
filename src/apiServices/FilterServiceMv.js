import * as request from '../utils/request';
import api from '../assets/Api';
const Filter = async ({ type, genres, page = 1, valueMin = 0, valueMax = 200 }) => {
    try {
        const res = await request.get(`discover/${type}`, {
            params: {
                api_key: `${api.key}`,
                sort_by: `popularity.desc`,
                with_genres: `${genres}`,
                'with_runtime.gte': `${valueMin}`,
                'with_runtime.lte': `${valueMax}`,
                'primary_release_date.gte': '2002-11-04',
                'primary_release_date.lte': '2022-07-28',
                'air_date.gte': '2002-11-04',
                'air_date.lte': '2022-07-28',
                page: page,
            },
        });
        return res.results;
    } catch (error) {}
};
export default Filter;
