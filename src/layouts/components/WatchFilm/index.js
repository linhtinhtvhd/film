import { memo } from 'react';
import Button from '~/components/Button';
import classNames from 'classnames/bind';
import styles from './WatchFilm.module.scss';
import api from '~/assets/Api';

const cx = classNames.bind(styles);
function WatchFilm({ film, handleWatch }) {
    return (
        <div className={cx('film')}>
            <img
                src={`${api.img}${film.backdrop_path || film.backdrop_path || film.backdrop_path}`}
                alt="film"
                className={cx('img-content')}
            />
            <div className={cx('content-film')}>
                <div className={cx('content-inner')}>
                    <img src={`${api.img}${film.poster_path}`} className={cx('img-film')} alt="film" />
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
                            <Button transparent>+ Add To Watchlist</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default memo(WatchFilm);
