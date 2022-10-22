import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import config from '~/config';
import Search from '~/layouts/components/Search';
import Button from '~/components/Button';
import { AiOutlineMenu } from 'react-icons/ai';
import { useEffect, useState } from 'react';

import image from '~/img';

const cx = classNames.bind(styles);

function Header() {
    const [active, setActive] = useState(false);
    const [isLogin, setIsLogin] = useState(JSON.parse(localStorage.getItem('isLogin')));
    useEffect(() => {
        setIsLogin(JSON.parse(localStorage.getItem('isLogin')));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [localStorage.getItem('isLogin')]);
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
                                <Link to={config.routes.profile} className={cx('menu-link')}>
                                    Contact Us
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
                    <div className={cx('logout', `${!isLogin && 'islogin'}`)}>
                        <Link to={config.routes.profile}>
                            <img className={cx('img-avatar')} src={image.avatarDefault} alt={'avatar'} />
                        </Link>
                    </div>
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
