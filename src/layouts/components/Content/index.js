import { Swiper, SwiperSlide } from 'swiper/react';
import { useState, useEffect, useContext, useLayoutEffect } from 'react';
import classNames from 'classnames/bind';
import { getUser, UpdateUser, getUserId, UpdateUserId } from '../../../apiServices/userService';
import MvPopular from '../../../apiServices/popularServiceMv';
import { LoginContext } from '../../../layouts/LoginLayout/LoginContext';
import styles from './Content.module.scss';
import { Navigation, Pagination, Autoplay } from 'swiper';
import api from '../../../assets/Api';
import { LazyLoadImage } from 'react-lazy-load-image-component';

// Import Swiper React components

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import Button from '../../../components/Button';

const cx = classNames.bind(styles);
function Content() {
    const { user, newListfilm, setNewListfilm, infoUser, userId } = useContext(LoginContext);
    const [moviePopular, setMoviePupular] = useState([]);
    const [height, setHeight] = useState((window.innerWidth * 9) / 16);
    const handleHeight = () => {
        setHeight((window.innerWidth * 9) / 16);
    };
    const handleUpdateListfilm = (id, img, tittle, rate, overview) => {
        const watchList = newListfilm.filter((fi) => {
            return id !== fi.id;
        });
        setNewListfilm(() => {
            return [{ id: id, type: 'movie', img: img, tittle: tittle, rate: rate, overview: overview }, ...watchList];
        });
    };
    useEffect(() => {
        const FeatchApiUser = async () => {
            getUserId(infoUser.id, JSON.parse(localStorage.getItem('token'))).then((res) => {
                setNewListfilm(res.data[0].listfilm || []);
            });
        };
        console.log();
        if (infoUser) {
            FeatchApiUser(infoUser.id);
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
    }, [user.username, localStorage.getItem('token')]);
    useLayoutEffect(() => {
        const featchUpdate = async () => {
            await UpdateUser({ newListfilm }, JSON.parse(localStorage.getItem('token')));
        };

        if (newListfilm.length > 0 && !userId) {
            featchUpdate();
        }
    }, [newListfilm, user.username]);
    useLayoutEffect(() => {
        const featchUpdate = async () => {
            await UpdateUserId({ newListfilm }, JSON.parse(localStorage.getItem('token')));
        };

        featchUpdate();
    }, [newListfilm, userId]);

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
                            <LazyLoadImage
                                src={`${api.img}${result.backdrop_path}`}
                                width={window.innerWidth}
                                height={(window.innerWidth * 9) / 16}
                                alt={result.original_title}
                            />
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
                                        <button
                                            className={cx('btn-add')}
                                            onMouseDown={() =>
                                                handleUpdateListfilm(
                                                    result.id,
                                                    `${api.img}${result.backdrop_path}`,
                                                    result.original_title,
                                                    result.vote_average,
                                                    result.overview,
                                                )
                                            }
                                        >
                                            + Add To Watchlist
                                        </button>
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
