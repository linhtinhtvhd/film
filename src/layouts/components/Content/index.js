import { Swiper, SwiperSlide } from 'swiper/react';
import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';

import MvPopular from '~/apiServices/popularServiceMv';
import api from '~/assets/Api';
import styles from './Content.module.scss';
import { Navigation, Pagination, Autoplay } from 'swiper';

// Import Swiper React components

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import Button from '~/components/Button';

const cx = classNames.bind(styles);

function Content() {
    const [moviePopular, setMoviePupular] = useState([]);
    useEffect(() => {
        const featchApi = async () => {
            const result = await MvPopular();
            setMoviePupular(result.splice(0, 5));
        };
        featchApi();
    }, []);
    return (
        <div className={cx('wrapper')}>
            <Swiper
                spaceBetween={0}
                centeredSlides={true}
                loop={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className={cx('mySwiper')}
            >
                {moviePopular.map((result) => {
                    return (
                        <SwiperSlide className={cx('big-content')} key={result.id}>
                            <img src={`${api.img}${result.backdrop_path}`} className={cx('img-content')} alt="film" />
                            <div className={cx('content-film')}>
                                <div className={cx('info-film')}>
                                    <p className={cx('tittle-film')}>{result.original_title}</p>
                                    <div className={cx('cast-film')}>
                                        <strong>Cast</strong>
                                        <p>Ryan Reynolds</p>
                                        <p>Morena Baccarin</p>
                                    </div>
                                    <ul className={cx('Rate-genre')}>
                                        <li>
                                            <strong>Rated:</strong> {result.ote_average}
                                        </li>
                                        <li>
                                            <strong>Genre:</strong> Horror, Comedy, Action, Sci-Fi.
                                        </li>
                                    </ul>
                                    <p className={cx('plot')}>{result.overview}</p>

                                    <div className={cx('btn-watch')}>
                                        <Button primary to={`/movie/${result.id}`}>
                                            Watch
                                        </Button>
                                        <Button transparent>+ Add To Watchlist</Button>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
}

export default Content;