import { memo } from 'react';
import classNames from 'classnames/bind';
import { Swiper, SwiperSlide } from 'swiper/react';
import { GrNext, GrPrevious } from 'react-icons/gr';
import styles from './Cast.module.scss';
import api from '~/assets/Api';
import 'swiper/css';
import 'swiper/css/navigation';

const cx = classNames.bind(styles);
function Cast({ cast }) {
    return (
        <div className={cx('cast-film')}>
            <div className={cx('wrapper')}>
                <h1 className={cx('tittle')}>Casts</h1>
                <div className={cx('swiper-slider')}>
                    <div>
                        <button class={'custom_next1'}>
                            <GrNext className={cx('custom_next')} />
                        </button>
                        <button class="custom_prev1">
                            <GrPrevious className={cx('custom_prev')} />
                        </button>
                        <Swiper
                            className={cx('swper')}
                            spaceBetween={20}
                            slidesPerView={8}
                            slidesPerGroup={4}
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
                                            src={`${api.img}${result.profile_path}`}
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
