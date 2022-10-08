import { memo, useState, useEffect, lazy, Suspense } from 'react';
import classNames from 'classnames/bind';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import { GrNext, GrPrevious } from 'react-icons/gr';
import styles from './Similar.module.scss';
import 'swiper/css';
import 'swiper/css/navigation';

const cx = classNames.bind(styles);
const ImgSmall = lazy(() => import('~/components/Img/imgSmall.js'));
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
                            slidesPerView={
                                widthWindow >= 1024 && widthWindow < 1160
                                    ? 5
                                    : widthWindow >= 740 && widthWindow < 1024
                                    ? 3
                                    : widthWindow < 740
                                    ? 2
                                    : 8
                            }
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
                                            <Suspense
                                                fallback={
                                                    <div
                                                        className={cx('loading')}
                                                        style={{
                                                            width: '100%',
                                                            backgroundColor: '#302f2f',
                                                            paddingTop: '140%',
                                                        }}
                                                    ></div>
                                                }
                                            >
                                                <ImgSmall result={result} />
                                            </Suspense>
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
