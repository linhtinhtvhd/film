import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import config from '~/config';
import Search from '~/layouts/components/Search';
import Button from '~/components/Button';
import { AiOutlineMenu } from 'react-icons/ai';
import { useState } from 'react';

const cx = classNames.bind(styles);

function Header() {
    const [active, setActive] = useState(false);
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
                        </ul>
                    </div>
                    <Search />
                    <div className={cx('btn-login')}>
                        <Button primary>Login</Button>
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
