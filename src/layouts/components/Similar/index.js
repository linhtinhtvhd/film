import { memo, useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import { GrNext, GrPrevious } from 'react-icons/gr';
import styles from './Similar.module.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import api from '~/assets/Api';

const cx = classNames.bind(styles);
function Similar({ similar, type }) {
    const [widthWindow, setWidthWindow] = useState(window.innerWidth);
    const handleWidth = () => {
        setWidthWindow(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener('resize', handleWidth);
        return () => {
            window.removeEventListener('resize', handleWidth);
        };
    }, [widthWindow]);
    return (
        <div className={cx('cast-film')}>
            <div className={cx('wrapper')}>
                <h1 className={cx('tittle')}>Similar</h1>
                <div className={cx('swiper-slider')}>
                    <div>
                        <button className={'custom_next'}>
                            <GrNext className={cx('custom_next')} />
                        </button>
                        <button className="custom_next">
                            <GrPrevious className={cx('custom_prev')} />
                        </button>
                        <Swiper
                            className={cx('swper')}
                            spaceBetween={20}
                            slidesPerView={`${
                                widthWindow >= 1024 && widthWindow < 1160
                                    ? 5
                                    : widthWindow >= 740 && widthWindow < 1024
                                    ? 4
                                    : widthWindow < 740
                                    ? 3
                                    : 6
                            }`}
                            slidesPerGroup={3}
                            loop={true}
                            navigation={{
                                nextEl: `.custom_next`,
                                prevEl: `.custom_prev`,
                            }}
                        >
                            {similar.map((result) => {
                                return (
                                    //

                                    <SwiperSlide className={cx('film')} key={result.id}>
                                        <Link to={`/${type}/${result.id}`} className={cx('link')}>
                                            <LazyLoadImage
                                                src={`${api.img}${result.poster_path}`}
                                                className={cx('img-film')}
                                                alt={result.original_title}
                                            />
                                            <p className={cx('name-film')}>{result.original_title}</p>
                                        </Link>
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default memo(Similar);
