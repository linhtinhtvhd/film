import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import Genre from '~/apiServices/genreService';
import styles from './SideBar.module.scss';
import { useLocation, Link } from 'react-router-dom';
const cx = classNames.bind(styles);

function SideBar() {
    const location = useLocation();

    let type = '';
    if (location.pathname === '/tv') {
        type = 'tv';
    } else if (location.pathname === '/movie') {
        type = 'movie';
    }
    const [genre, setGenre] = useState([]);

    useEffect(() => {
        const featchApi = async () => {
            try {
                const res = await Genre(type);
                setGenre(res.splice(0, 8));
                console.log(res);
            } catch (error) {}
        };
        featchApi();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [type]);
    return (
        <div className={cx('wrapper')}>
            {genre.map((res) => {
                return (
                    <Link to={`/explore/${type}`}>
                        <button className={cx('btn-genre')} key={res.id}>
                            {res.name}
                        </button>
                    </Link>
                );
            })}
        </div>
    );
}

export default SideBar;
