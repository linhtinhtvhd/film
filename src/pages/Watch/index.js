import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { useEffect, useState, useRef } from 'react';
import classNames from 'classnames/bind';
import SwiperCore, { Navigation } from 'swiper';
import * as request from '../../utils/request';
import Header from '../../layouts/DefaultLayout/Header';
import styles from './Watch.module.scss';
import api from '../../assets/Api';
import { getUser, getUserId } from '../../apiServices/userService';
import { getComment, updateComment } from '../../apiServices/commentService';
import { LoginContext } from '../../layouts/LoginLayout/LoginContext';
import image from '../../img';
import 'swiper/css';
import 'swiper/css/navigation';
import Cast from '../../layouts/components/Cast';
import Similar from '../../layouts/components/Similar';
import { useContext } from 'react';
import { CgPen } from 'react-icons/cg';
import WatchFilm from '../../layouts/components/WatchFilm';
const cx = classNames.bind(styles);
SwiperCore.use([Navigation]);

function Watch() {
    const location = useLocation();
    const search = location.search;
    const navigate = useNavigate();
    const [comment, setComment] = useState([]);
    const { user, infoUser, setInfoUser } = useContext(LoginContext);
    const [newComment, setNewComment] = useState();
    const commentRef = useRef();

    const params = new URLSearchParams(search);
    let seso = params.get('season');
    let esp = params.get('episode');

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
    const [active, setActive] = useState(1);
    const [activeSeason, setActiveSeason] = useState(1);
    const [episodeNumber, setEpisodeNumber] = useState([]);
    const [seasonNumber, setSeasonNumber] = useState([]);

    const handleWatch = useCallback(() => {
        setWatch(true);
        window.scrollTo({
            behavior: 'smooth',
            top: button1Ref.current.offsetTop,
        });
    }, []);
    const handleComment = async (e) => {
        e.preventDefault();
        if (JSON.parse(localStorage.getItem('isLogin'))) {
            setComment((prev) => {
                return [
                    ...prev,
                    {
                        fullname: infoUser.fullname,
                        comment: newComment,
                        avatar: infoUser.avatar,
                    },
                ];
            });
            commentRef.current.value = '';
        } else {
            navigate('/login');
        }
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
                if (type === 'tv') {
                    const result = await request.get(`${type}/${id}/season/${season}`, {
                        params: {
                            api_key: `${api.key}`,
                            language: 'en-US',
                        },
                    });
                    setEpisodeNumber((prev = []) => {
                        prev = [];
                        for (let i = 1; i <= result.episodes.length; i++) {
                            prev.push(i);
                        }
                        return prev;
                    });
                }

                const resCast = await request.get(`${type}/${id}/credits`, {
                    params: {
                        api_key: `${api.key}`,
                        language: 'en-US',
                    },
                });

                const reSimailar = await request.get(`${type}/${id}/similar`, {
                    params: {
                        api_key: `${api.key}`,
                        language: 'en-US',
                    },
                });
                setFilm(res);
                setSeasonNumber((prev = []) => {
                    prev = [];
                    for (let i = 1; i <= res.number_of_seasons; i++) {
                        prev.push(i);
                    }
                    return prev;
                });

                setCast((prev) => {
                    prev = resCast.cast.filter((e) => {
                        return !!e.profile_path;
                    });
                    return prev;
                });
                setSimilar(reSimailar.results);
            } catch (error) {}
        };
        featchApi();

        setWatch(false);
        setSeason(seso || 1);
        setEpisode(esp || 1);
        setActiveSeason(Number(seso) || 1);
        setActive(Number(esp) || 1);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, season]);
    useEffect(() => {
        const FeatchApiUser = async () => {
            getUser(user.username, JSON.parse(localStorage.getItem('token'))).then((res) => {
                setInfoUser(res.data[0]);
            });
        };
        if (user.username) {
            FeatchApiUser();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [localStorage.getItem('token')]);
    useEffect(() => {
        const FeatchApiUser = async () => {
            getUserId(infoUser.id, JSON.parse(localStorage.getItem('token'))).then((res) => {
                setInfoUser(res.data[0]);
            });
        };

        if (infoUser) {
            FeatchApiUser();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [localStorage.getItem('token')]);
    useEffect(() => {
        getComment(id).then((res) => {
            if (res.data.length > 0) {
                setComment(res.data[0].body);
            }
        });
    }, [id]);
    useEffect(() => {
        const featchUpdate = async () => {
            await updateComment({ comment, id });
        };
        if (comment.length > 0) {
            featchUpdate();
        }
    }, [comment, id]);

    return (
        <div className={cx('watch')}>
            <div className={cx('header')} ref={top}>
                <Header />
            </div>

            <div className={cx('container')}>
                <div className={cx('wrapper')}>
                    <div className={cx('inner')}>
                        <WatchFilm film={film} id={id} type={type} handleWatch={handleWatch} />

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
                                                    : seso
                                                    ? `https://www.2embed.to/embed/tmdb/tv?id=${id}&s=${seso}&e=${esp}`
                                                    : `https://www.2embed.to/embed/tmdb/tv?id=${id}&s=${season}&e=${episode}`
                                            }
                                            frameBorder="0"
                                            allowFullScreen="allowfullscreen"
                                        ></iframe>
                                    </div>
                                    <div className={cx('season')}>
                                        {seasonNumber.map((result) => {
                                            return (
                                                <Link
                                                    to={`/${type}/${id}?season=${result}&episode=${episode}`}
                                                    key={result}
                                                >
                                                    <button
                                                        key={result}
                                                        id={result}
                                                        className={cx(
                                                            `btn`,
                                                            `${activeSeason === result ? 'active' : undefined}`,
                                                        )}
                                                        onClick={() => {
                                                            setActiveSeason(result);
                                                            setSeason(result);
                                                            seso = season;
                                                        }}
                                                    >
                                                        Season {result}
                                                    </button>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                    <div className={cx('episode')}>
                                        {episodeNumber.map((result) => {
                                            return (
                                                <Link
                                                    to={`/${type}/${id}?season=${season}&episode=${result}`}
                                                    key={result}
                                                >
                                                    <button
                                                        key={result}
                                                        id={result}
                                                        className={cx(
                                                            `btn`,
                                                            `${active === result ? 'active' : undefined}`,
                                                        )}
                                                        onClick={() => {
                                                            setActive(result);
                                                            setEpisode(result);
                                                            esp = episode;
                                                        }}
                                                    >
                                                        tap {result}
                                                    </button>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </>
                            )}
                            <div className={cx('overview')}>
                                <h2>OverView</h2>
                                <p>{film.overview}</p>
                            </div>
                            <Cast cast={cast} />
                            <div className={cx('comment-user')}>
                                <p className={cx('tittle-cmt')}>Comment</p>
                                <form
                                    className={cx('form-cmt')}
                                    onSubmit={(e) => {
                                        handleComment(e);
                                    }}
                                >
                                    <div className={cx('input')}>
                                        {infoUser ? (
                                            <img
                                                className={cx('img-avatar')}
                                                src={infoUser.avatar || image.avatarDefault}
                                                alt={'avatar'}
                                            />
                                        ) : null}
                                        <input
                                            ref={commentRef}
                                            className={cx('input-cmt')}
                                            placeholder="Enter your comment..."
                                            type={'text'}
                                            onChange={(e) => {
                                                setNewComment(e.target.value);
                                            }}
                                        />
                                    </div>
                                    <button className={cx('btn-cmt')}>
                                        {' '}
                                        <CgPen className={cx('icon-btn')} />
                                    </button>
                                </form>
                                {comment.length > 0 ? (
                                    <div className={cx('info-cmt')}>
                                        {comment.map((res, index) => {
                                            return (
                                                <div className={cx('user-cmt')} key={index}>
                                                    <img
                                                        className={cx('img-avatar')}
                                                        src={res.avatar || image.avatarDefault}
                                                        alt={'avatar'}
                                                    />
                                                    <div className={cx('container-cmt')}>
                                                        <p className={cx('fullname-cmt')}>{res.fullname}</p>
                                                        <p className={cx('content-cmt')}>{res.comment}</p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                ) : null}
                            </div>
                            <Similar similar={similar} type={type} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Watch;
