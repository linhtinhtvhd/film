import classNames from 'classnames/bind';
import { useParams, Link, useLocation } from 'react-router-dom';
import styles from './explore.module.scss';
import { GenreContext } from '~/layouts/ExploreLayout/GenreContext';
import { useContext, useEffect, useState } from 'react';
import Filter from '~/apiServices/FilterServiceMv';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import api from '~/assets/Api';
const cx = classNames.bind(styles);

function Explore() {
    const location = useLocation();
    const search = location.search;
    let params = new URLSearchParams(search);
    let query = params.get('genre');
    const genreContext = useContext(GenreContext);

    let { type } = useParams();
    let genres = genreContext.gen.join(',');
    let valueMin = genreContext.valueMin[0];
    let valueMax = genreContext.valueMin[1];
    const [films, setFilms] = useState([]);
    const [scroll, setScroll] = useState(0);
    const [page, setPage] = useState(1);
    const [activeTv, setActiveTv] = useState(false);
    const [activeMv, setActiveMv] = useState(false);
    useEffect(() => {
        const featchApi = async () => {
            const result = await Filter({ type, genres, valueMin, valueMax });
            setFilms(result);
        };
        featchApi();

        setActiveMv(type === 'movie' && true);
        setActiveTv(type === 'tv' && true);
        setScroll(0);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [type, genres, valueMin, valueMax, query]);
    useEffect(() => {
        const featchApii = async () => {
            const result = await Filter({ type, genres, page });

            setFilms([...films].concat(result));
        };
        const handleScroll = () => {
            if (window.scrollY - scroll >= 500) {
                setScroll((prev) => prev + 500);
                setPage((prev) => prev + 1);
            }
        };

        window.addEventListener('scroll', handleScroll);
        featchApii();
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, scroll]);
    return (
        <div className={cx('inner')}>
            <div className={cx('btn-type')}>
                <Link to={`/explore/tv`}>
                    <button className={cx('btn', `${activeTv ? 'active' : undefined}`)}>Tv Show</button>
                </Link>
                <Link to={`/explore/movie`}>
                    <button className={cx('btn', `${activeMv ? 'active' : undefined}`)}>Movie</button>
                </Link>
            </div>
            <div className={cx('table-film')}>
                {films.map((res) => {
                    return (
                        <div className={cx('film')} key={res.id}>
                            <Link to={`/${type}/${res.id}`} className={cx('link')}>
                                <LazyLoadImage
                                    className={cx('img-film')}
                                    src={`${api.img}${res.poster_path}`}
                                    alt={res.original_title}
                                />
                                <p className={cx('name-film')}>{res.original_title || res.original_name}</p>
                            </Link>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Explore;
