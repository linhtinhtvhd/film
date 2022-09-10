import { useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import classNames from 'classnames/bind';
import SwiperCore, { Navigation } from 'swiper';
import * as request from '~/utils/request';
import Header from '~/layouts/DefaultLayout/Header';
import styles from './Watch.module.scss';
import api from '~/assets/Api';
import Button from '~/components/Button';
import 'swiper/css';
import 'swiper/css/navigation';
import Cast from '~/layouts/components/Cast';
import Similar from '~/layouts/components/Similar';

const cx = classNames.bind(styles);
SwiperCore.use([Navigation]);
function Watch() {
    let type = 'movie';
    if (window.location.href.includes(type)) {
        type = 'movie';
    } else {
        type = 'tv';
    }

    let { id } = useParams();

    const button1Ref = useRef();
    const top = useRef();
    const [film, setFilm] = useState([]);
    const [watch, setWatch] = useState(false);
    const [cast, setCast] = useState([]);
    const [similar, setSimilar] = useState([]);
    const [season, setSeason] = useState(1);
    const [episode, setEpisode] = useState(1);
    const [active, setActive] = useState();
    const [episodeNb, setEpisodeNb] = useState();
    const [episodeNumber, setEpisodeNumber] = useState([]);
    const handleWatch = () => {
        setWatch(true);
        window.scrollTo({
            behavior: 'smooth',
            top: button1Ref.current.offsetTop,
        });
    };
    useEffect(() => {
        window.scrollTo({
            behavior: 'smooth',
            top: top.current.offsetTop,
        });
        const featchApi = async () => {
            try {
                const res = await request.get(`${type}/${id}`, {
                    params: {
                        api_key: `${api.key}`,
                        language: 'en-US',
                    },
                });

                setFilm(res);

                const featchApiCast = async () => {
                    try {
                        const res = await request.get(`${type}/${id}/credits`, {
                            params: {
                                api_key: `${api.key}`,
                                language: 'en-US',
                            },
                        });
                        setCast(res.cast.splice(0, 10));
                    } catch (error) {}
                };
                featchApiCast();
            } catch (error) {}
            const featchApiSimilar = async () => {
                try {
                    const res = await request.get(`${type}/${id}/similar`, {
                        params: {
                            api_key: `${api.key}`,
                            language: 'en-US',
                        },
                    });
                    setSimilar(res.results);
                } catch (error) {}
            };
            featchApiSimilar();
        };
        featchApi();
        setWatch(false);
    }, [id]);

    let seasonNumber = [];

    for (let i = 1; i <= film.number_of_seasons; i++) {
        seasonNumber.push(i);
    }

    return (
        <>
            <div className={cx('header')} ref={top}>
                <Header />
            </div>

            <div className={cx('container')}>
                <div className={cx('wrapper')}>
                    <div className={cx('inner')}>
                        <div className={cx('film')}>
                            <img src={`${api.img}${film.backdrop_path}`} alt="film" className={cx('img-content')} />
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
                        <div ref={button1Ref} className={cx('main-content')}>
                            {watch && (
                                <>
                                    <div className={cx('video')}>
                                        <iframe
                                            title="hrhr"
                                            id="iframe"
                                            src={
                                                type === 'movie'
                                                    ? `https://www.2embed.to/embed/tmdb/movie?id=${id}`
                                                    : `https://www.2embed.to/embed/tmdb/tv?id=${id}&s=${season}&e=${episode}`
                                            }
                                            frameBorder="0"
                                            allowFullScreen="allowfullscreen"
                                        ></iframe>
                                    </div>
                                    <div className={cx('season')}>
                                        {seasonNumber.map((result) => {
                                            return (
                                                <button
                                                    key={result}
                                                    id={result}
                                                    onClick={(e) => {
                                                        setSeason(result);
                                                        id = film.seasons[season].id;
                                                        setEpisodeNb(film.number_of_episodes);
                                                        console.log(episodeNb);
                                                    }}
                                                >
                                                    Season {result}
                                                </button>
                                            );
                                        })}
                                    </div>
                                    <div className={cx('episode')}>
                                        {episodeNumber.map((result) => {
                                            return (
                                                <button
                                                    key={result}
                                                    id={result}
                                                    className={cx(`btn`, `${active === result ? 'active' : undefined}`)}
                                                    onClick={(e) => {
                                                        setActive(result);
                                                        setEpisode(result);
                                                    }}
                                                >
                                                    tap {result}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </>
                            )}
                            <Cast cast={cast} />
                            <Similar similar={similar} type={type} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Watch;
