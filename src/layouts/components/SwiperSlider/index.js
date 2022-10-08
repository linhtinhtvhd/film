import { useState, useEffect, lazy, useRef, Suspense } from 'react';
import classNames from 'classnames/bind';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import { GrNext, GrPrevious } from 'react-icons/gr';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import styles from './SwiperSlider.module.scss';

import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);
SwiperCore.use([Navigation]);
const ImgSmall = lazy(() => import('~/components/Img/imgSmall.js'));
function SwiperSlider({ custom_btn, tittle, service, href, slidesPerView = 4.5, slidesPerGroup = 4 }) {
    let ref = useRef('');
    const [answer, setAnswer] = useState([]);
    const [widthWindow, setWidthWindow] = useState(window.innerWidth);
    const handleWidth = () => {
        setWidthWindow(window.innerWidth);
    };

    useEffect(() => {
        const featchApi = async () => {
            let fc = service;
            const result = await fc();
            setAnswer(result.splice(0, 16));
        };
        featchApi();
        console.log(ref);
        window.addEventListener('resize', handleWidth);

        return () => {
            window.removeEventListener('resize', handleWidth);
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [widthWindow]);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <h1 className={cx('tittle')}>{tittle}</h1>
                <div className={cx('swiper-slider')}>
                    <div>
                        <button className={custom_btn[0]}>
                            <GrNext className={cx('custom_next')} />
                        </button>
                        <button className={custom_btn[1]}>
                            <GrPrevious className={cx('custom_prev')} />
                        </button>
                        <Swiper
                            className={cx('swper')}
                            spaceBetween={20}
                            modules={[Navigation]}
                            slidesPerGroup={3}
                            slidesPerView={`${
                                widthWindow >= 1024 && widthWindow < 1160
                                    ? 4
                                    : widthWindow >= 740 && widthWindow < 1024
                                    ? 3
                                    : widthWindow < 740
                                    ? 2
                                    : slidesPerView
                            }`}
                            navigation={{ nextEl: `.${custom_btn[0]}`, prevEl: `.${custom_btn[1]}` }}
                            loop={true}
                        >
                            {answer.map((result) => {
                                let a = ' ';
                                if (!href) {
                                    a = result.media_type;
                                } else {
                                    a = href;
                                }

                                return (
                                    //
                                    <SwiperSlide className={cx('film')} key={result.id} ref={ref}>
                                        <Link to={`/${a}/${result.id}`} className={cx('link')}>
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

export default SwiperSlider;
