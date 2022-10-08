import { Swiper, SwiperSlide } from 'swiper/react';
import { useState, useEffect, lazy, Suspense } from 'react';
import classNames from 'classnames/bind';

import MvPopular from '~/apiServices/popularServiceMv';

import styles from './Content.module.scss';
import { Navigation, Pagination, Autoplay } from 'swiper';

// Import Swiper React components

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import Button from '~/components/Button';

const cx = classNames.bind(styles);
const ImgBig = lazy(() => import('~/components/Img/imgBig.js'));
function Content() {
    const [moviePopular, setMoviePupular] = useState([]);
    const [height, setHeight] = useState((window.innerWidth * 9) / 16);
    const handleHeight = () => {
        setHeight((window.innerWidth * 9) / 16);
    };
    useEffect(() => {
        const featchApi = async () => {
            const result = await MvPopular();
            setMoviePupular(result.splice(0, 5));
        };
        featchApi();

        window.addEventListener('resize', handleHeight);
        return () => {
            window.removeEventListener('resize', handleHeight);
        };
    }, [height]);
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
                            <Suspense
                                fallback={
                                    <div
                                        style={{ width: '100%', height: `${height}px`, backgroundColor: '#302f2f' }}
                                    ></div>
                                }
                            >
                                <ImgBig result={result} />
                            </Suspense>
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
                                            <strong>Rated:</strong> {result.vote_average}
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
