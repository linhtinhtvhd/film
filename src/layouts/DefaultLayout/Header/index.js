import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import config from '../../../config';
import Search from '../../../layouts/components/Search';
import Button from '../../../components/Button';
import { AiOutlineMenu } from 'react-icons/ai';
import { useEffect, useState, useContext } from 'react';
import { getUser, getUserId } from '../../../apiServices/userService';
import { LoginContext } from '../../../layouts/LoginLayout/LoginContext';

import image from '../../../img';

const cx = classNames.bind(styles);

function Header() {
    const { user, changeAvatar, infoUser, setInfoUser, userId } = useContext(LoginContext);

    const [active, setActive] = useState(false);
    const [isLogin, setIsLogin] = useState(JSON.parse(localStorage.getItem('isLogin')));
    useEffect(() => {
        setIsLogin(JSON.parse(localStorage.getItem('isLogin')));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [localStorage.getItem('isLogin')]);
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
    }, [isLogin]);
    useEffect(() => {
        const FeatchApiUser = async () => {
            getUserId(userId, JSON.parse(localStorage.getItem('token'))).then((res) => {
                console.log(res);
                setInfoUser(res.data[0]);
            });
        };

        FeatchApiUser();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLogin]);
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to={config.routes.home} className={cx('logo-link')}>
                    <span className={cx('left-logo')}>Pink</span>
                    <span className={cx('right-logo')}>Link</span>
                </Link>
                <div className={cx('header-menu')}>
                    <div
                        className={cx('nav-menu', `${active ? 'active' : undefined}`)}
                        onClick={() => {
                            setActive(false);
                        }}
                    >
                        <ul className={cx('menu')}>
                            <li className={cx('item-menu')}>
                                <Link to={config.routes.home} className={cx('menu-link')}>
                                    Home
                                </Link>
                            </li>
                            <li className={cx('item-menu')}>
                                <Link to={config.routes.mv} className={cx('menu-link')}>
                                    Movies
                                </Link>
                            </li>
                            <li className={cx('item-menu')}>
                                <Link to={config.routes.tv} className={cx('menu-link')}>
                                    Tv Shows
                                </Link>
                            </li>
                            <li className={cx('item-menu')}>
                                <Link to={`/explore/movie`} className={cx('menu-link')}>
                                    Explore
                                </Link>
                            </li>
                            <li className={cx('item-menu')}>
                                <Link to={config.routes.contact} className={cx('menu-link')}>
                                    Contact Us
                                </Link>
                            </li>

                            {infoUser ? (
                                <li className={cx('item-menu', 'resp', `${!isLogin && 'islogin'}`)}>
                                    <Link to={config.routes.profile} className={cx('menu-link')}>
                                        Profile
                                    </Link>
                                </li>
                            ) : null}
                            <li className={cx('item-menu', 'resp', `${isLogin && 'islogin'}`)}>
                                <Link to={config.routes.login} className={cx('menu-link')}>
                                    Login
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <Search />
                    <div className={cx('btn-login', `${isLogin && 'islogin'}`)}>
                        <Button to={config.routes.login} primary>
                            Login
                        </Button>
                    </div>
                    {infoUser ? (
                        <div className={cx('logout', `${!isLogin && 'islogin'}`)}>
                            <Link to={config.routes.profile}>
                                <img
                                    className={cx('img-avatar')}
                                    src={`${changeAvatar || infoUser.avatar || image.avatarDefault}`}
                                    alt={'avatar'}
                                />
                            </Link>
                        </div>
                    ) : null}
                    <AiOutlineMenu
                        className={cx('btn-menu')}
                        onClick={() => {
                            setActive(active === true ? false : true);
                        }}
                    />
                </div>
            </div>
        </header>
    );
}

export default Header;
