import classNames from 'classnames/bind';
import { useEffect, useState, useContext } from 'react';
import Genre from '~/apiServices/genreService';
import styles from './SideBarExplore.module.scss';
import { useLocation, useParams } from 'react-router-dom';
import { GenreContext } from '~/layouts/ExploreLayout/GenreContext';
const cx = classNames.bind(styles);

function SideBarExplore({ handle }) {
    const location = useLocation();
    const genreContext = useContext(GenreContext);
    let { type } = useParams();
    if (location.pathname === '/explore/tv') {
        type = 'tv';
    } else if (location.pathname === 'explore/movie') {
        type = 'movie';
    }

    const [genre, setGenre] = useState([]);

    useEffect(() => {
        const featchApi = async () => {
            try {
                const res = await Genre(type);
                setGenre(res);
            } catch (error) {}
        };
        featchApi();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [type]);
    return (
        <div className={cx('wrapper')}>
            {genre.map((res) => {
                return (
                    <button
                        className={cx(`btn-genre`, `${genreContext.gen.includes(res.id) ? 'active' : undefined}`)}
                        key={res.id}
                        onClick={() => {
                            genreContext.handleAddGenre(res.id);
                            handle();
                        }}
                    >
                        {res.name}
                    </button>
                );
            })}
        </div>
    );
}

export default SideBarExplore;
