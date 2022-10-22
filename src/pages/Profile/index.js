import classNames from 'classnames/bind';
import { useState, useContext, useEffect, useRef } from 'react';
import styles from './Profile.module.scss';
import { CgPen, CgShapeTriangle } from 'react-icons/cg';
import { getUser, UpdateUser } from '~/apiServices/userService';
import { LoginContext } from '~/layouts/LoginLayout/LoginContext';
import image from '~/img';
import { Link, useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function Profile() {
    const Navigate = useNavigate();
    const passwordRef = useRef();
    const fullnameRef = useRef();
    const { user } = useContext(LoginContext);
    const [infoUser, setInfoUser] = useState();
    const [newPassword, setNewPassword] = useState('');
    const [newFullname, setNewFullname] = useState('');
    const [active, setActive] = useState(false);
    const handleChangePassword = async (e) => {
        e.preventDefault();
        await UpdateUser({ newPassword }, JSON.parse(localStorage.getItem('token')));
        passwordRef.current.value = '';
    };
    const handleChangeFullname = async (e) => {
        e.preventDefault();
        await UpdateUser({ newFullname }, JSON.parse(localStorage.getItem('token')));
        setActive(false);
        fullnameRef.current.value = '';
        window.location.reload();
    };
    const handleActive = () => {
        setActive(true);
    };
    const handleLogout = () => {
        localStorage.setItem('isLogin', false);
        localStorage.removeItem('token');
        Navigate('/');
    };
    useEffect(() => {
        const FeatchApiUser = async () => {
            getUser(user.username, JSON.parse(localStorage.getItem('token'))).then((res) => {
                setInfoUser(res.data[0]);
            });
        };
        FeatchApiUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <>
            {infoUser ? (
                <div className={cx('wrapper')}>
                    <div className={cx('inner')}>
                        <div className={cx('profile')}>
                            <div className={cx('fullname', 'mt')}>
                                <h2>Fullname</h2>
                                <div className={cx('name', `${active ? 'unActive-btn' : 'active-btn'}`)}>
                                    <p>{infoUser.fullname}</p>
                                    <button className={cx('btn-name')} onClick={handleActive}>
                                        <CgPen className={cx('icon-btn')} />
                                    </button>
                                </div>
                                <form
                                    className={cx('form', `${active ? 'active-btn' : 'unActive-btn'}`)}
                                    onSubmit={handleChangeFullname}
                                >
                                    <input
                                        ref={fullnameRef}
                                        className={cx('input')}
                                        type={'text'}
                                        placeholder="New Fullname"
                                        onChange={(e) => {
                                            if (e.keyCode === 27) {
                                                setActive(false);
                                            }
                                            setNewFullname(e.target.value);
                                        }}
                                    />
                                    <button className={cx('btn-name')}>
                                        <CgShapeTriangle className={cx('icon-btn')} />
                                    </button>
                                </form>
                                <p className={cx('', `${active ? 'active-btn' : 'unActive-btn'}`)}>
                                    Press ESC to cancel
                                </p>
                            </div>
                            <div className={cx('username', 'mt')}>
                                <h2>Username:</h2>
                                <p>{infoUser.username}</p>
                            </div>
                            <div className={cx('change-password', 'mt')}>
                                <h2>Change password</h2>
                                <form className={cx('form-changepass')} onSubmit={handleChangePassword}>
                                    <input
                                        ref={passwordRef}
                                        onChange={(e) => {
                                            setNewPassword(e.target.value);
                                        }}
                                        className={cx('input')}
                                        type={'password'}
                                        placeholder="New password"
                                    />
                                    <button className={cx('btn-update')}>Update</button>
                                </form>
                            </div>
                        </div>
                        <div className={cx('img-profile')}>
                            <img className={cx('img-avatar')} src={image.avatarDefault} alt={'avatar'} />
                            <div className={cx('logout')}>
                                <p>{infoUser.fullname}</p>
                                <button onClick={handleLogout}>Logout</button>
                            </div>
                        </div>
                    </div>
                    <div className={cx('list-film')}>
                        <p className={cx('tittle')}>Danh sách phim đã thêm</p>
                        {infoUser.listfilm.map((res) => {
                            return (
                                <Link to={`/${res.type}/${res.id}`} key={res.id}>
                                    <div className={cx('inner-listfilm')}>
                                        <img className={cx('img-film')} src={res.img} alt={res.tittle} />
                                        <div className={cx('info-film')}>
                                            <span className={cx('tittle-film')}>{res.tittle}</span>
                                            <p className={cx('rate-film')}>
                                                <strong>Rate:</strong>
                                                {res.rate}
                                            </p>
                                            <p className={cx('overview-film')}>
                                                <strong>Overview:</strong>
                                                {res.overview}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            ) : null}
        </>
    );
}

export default Profile;
