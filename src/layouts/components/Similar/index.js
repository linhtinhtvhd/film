import classNames from 'classnames/bind';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import { GrNext, GrPrevious } from 'react-icons/gr';
import styles from './Similar.module.scss';
import api from '~/assets/Api';
import 'swiper/css';
import 'swiper/css/navigation';

const cx = classNames.bind(styles);
function Similar({ similar, type }) {
    return (
        <div className={cx('cast-film')}>
            <div className={cx('wrapper')}>
                <h1 className={cx('tittle')}>Similar</h1>
                <div className={cx('swiper-slider')}>
                    <div>
                        <button class={'custom_next'}>
                            <GrNext className={cx('custom_next')} />
                        </button>
                        <button class="custom_next">
                            <GrPrevious className={cx('custom_prev')} />
                        </button>
                        <Swiper
                            className={cx('swper')}
                            spaceBetween={20}
                            slidesPerView={6}
                            slidesPerGroup={4}
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
                                            <img
                                                src={`${api.img}${result.poster_path}`}
                                                className={cx('img-film')}
                                                alt="film"
                                            />
                                            <p className={cx('name-film')}>
                                                {result.original_title || result.original_name}
                                            </p>
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

export default Similar;
