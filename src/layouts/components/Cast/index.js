import { memo, useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { Swiper, SwiperSlide } from 'swiper/react';
import { GrNext, GrPrevious } from 'react-icons/gr';
import styles from './Cast.module.scss';
import api from '~/assets/Api';
import 'swiper/css';
import 'swiper/css/navigation';

const cx = classNames.bind(styles);
function Cast({ cast }) {
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
                <h1 className={cx('tittle')}>Casts</h1>
                <div className={cx('swiper-slider')}>
                    <div>
                        <button className={'custom_next1'}>
                            <GrNext className={cx('custom_next')} />
                        </button>
                        <button className="custom_prev1">
                            <GrPrevious className={cx('custom_prev')} />
                        </button>
                        <Swiper
                            className={cx('swper')}
                            spaceBetween={20}
                            slidesPerView={
                                widthWindow >= 1024 && widthWindow < 1160
                                    ? 6
                                    : widthWindow >= 740 && widthWindow < 1024
                                    ? 4
                                    : widthWindow < 740
                                    ? 3
                                    : 8
                            }
                            slidesPerGroup={3}
                            loop={true}
                            navigation={{
                                nextEl: `.custom_next1`,
                                prevEl: `.custom_prev1`,
                            }}
                        >
                            {cast.map((result) => {
                                return (
                                    //

                                    <SwiperSlide className={cx('cast')} key={result.id}>
                                        <img
                                            src={`${api.img}${
                                                result.profile_path || result.profile_path || result.profile_path
                                            }`}
                                            className={cx('img-cast')}
                                            alt="cast"
                                        />
                                        <p className={cx('name-cast')}>{result.original_name}</p>
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

export default memo(Cast);
