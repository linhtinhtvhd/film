import { memo } from 'react';
import Button from '../../../components/Button';
import classNames from 'classnames/bind';
import styles from './WatchFilm.module.scss';
import api from '../../../assets/Api';
import { getUser, UpdateUser, getUserId, UpdateUserId } from '../../../apiServices/userService';
import { LoginContext } from '../../../layouts/LoginLayout/LoginContext';
import { useEffect, useContext } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const cx = classNames.bind(styles);
function WatchFilm({ film, handleWatch, id, type }) {
    const { user, newListfilm, setNewListfilm, infoUser, userId } = useContext(LoginContext);
    const handleUpdateListfilm = (id, type, img, tittle, rate, overview) => {
        const watchList = newListfilm.filter((fi) => {
            return id !== fi.id;
        });

        setNewListfilm(() => {
            return [{ id: id, type: type, img: img, tittle: tittle, rate: rate, overview: overview }, ...watchList];
        });
    };
    useEffect(() => {
        const FeatchApiUser = async () => {
            getUserId(infoUser.id, JSON.parse(localStorage.getItem('token'))).then((res) => {
                setNewListfilm(res.data[0].listfilm || []);
            });
        };

        if (infoUser) {
            FeatchApiUser();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [infoUser, localStorage.getItem('token')]);
    useEffect(() => {
        const FeatchApiUser = async () => {
            getUser(user.username, JSON.parse(localStorage.getItem('token'))).then((res) => {
                setNewListfilm(res.data[0].listfilm || []);
            });
        };
        if (user.username) {
            FeatchApiUser();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        const featchUpdate = async () => {
            await UpdateUser({ newListfilm }, JSON.parse(localStorage.getItem('token')));
        };
        if (newListfilm.length > 0) {
            featchUpdate();
        }
    }, [newListfilm]);
    useEffect(() => {
        const featchUpdate = async () => {
            await UpdateUserId({ newListfilm }, JSON.parse(localStorage.getItem('token')));
        };
        if (newListfilm.length > 0) featchUpdate();
    }, [newListfilm, userId]);
    return (
        <div className={cx('film')}>
            <LazyLoadImage
                src={`${api.img}${film.backdrop_path}`}
                width={window.innerWidth}
                height={(window.innerWidth * 9) / 16}
                alt={film.original_title}
            />
            <div className={cx('content-film')}>
                <div className={cx('content-inner')}>
                    <LazyLoadImage
                        className={cx('img-film')}
                        src={`${api.img}${film.poster_path}`}
                        width={300}
                        height={(300 * 3) / 2}
                        alt={film.original_title}
                    />
                    <div className={cx('info-film')}>
                        <p className={cx('tittle-film')}>{film.original_title || film.name}</p>

                        <ul className={cx('Rate-genre')}>
                            <li>
                                <strong>Rated:</strong> {film.vote_average}
                            </li>
                        </ul>

                        <p className={cx('plot')}>{film.overview}</p>
                        <div className={cx('btn-watch')}>
                            <Button primary onClick={onclick} clickWatch={handleWatch}>
                                Watch
                            </Button>
                            <button
                                className={cx('btn-add')}
                                onMouseUp={() =>
                                    handleUpdateListfilm(
                                        id,
                                        type,
                                        `${api.img}${film.backdrop_path}`,
                                        film.original_title || film.name,
                                        film.vote_average,
                                        film.overview,
                                    )
                                }
                            >
                                + Add To Watchlist
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default memo(WatchFilm);
