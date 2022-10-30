import classNames from 'classnames/bind';
import { useState, useContext, useEffect, useRef } from 'react';
import styles from './Profile.module.scss';
import { CgPen, CgShapeTriangle } from 'react-icons/cg';
import { getUser, UpdateUser, DeleteUser, getUserId } from '../../apiServices/userService';
import { LoginContext } from '../../layouts/LoginLayout/LoginContext';
import image from '../../img';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const cx = classNames.bind(styles);

function Profile() {
    const Navigate = useNavigate();
    const passwordRef = useRef();
    const fullnameRef = useRef();
    const { user, setChangeAvatar, changeAvatar, infoUser, setInfoUser, userId } = useContext(LoginContext);

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
        const getUser = async () => {
            try {
                await axios({
                    method: 'GET',
                    url: 'http://localhost:3001/auth/logout',
                    withCredentials: true,
                });
            } catch (error) {}
        };
        getUser();
        Navigate('/');
    };
    const handleDeleteAccount = async () => {
        await DeleteUser(JSON.parse(localStorage.getItem('token')));
        localStorage.setItem('isLogin', false);
        localStorage.removeItem('token');
        Navigate('/');
    };
    const handleChangeAvatar = async (e) => {
        const avatar = e.target.files[0];
        const newAvatar = await convertBase64(avatar);
        setChangeAvatar(newAvatar);

        await UpdateUser({ newPassword }, JSON.parse(localStorage.getItem('token')));
    };
    const convertBase64 = (avatar) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(avatar);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };
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
    }, []);
    useEffect(() => {
        const FeatchApiUser = async () => {
            getUserId(userId, JSON.parse(localStorage.getItem('token'))).then((res) => {
                setInfoUser(res.data[0]);
            });
        };
        if (userId) {
            FeatchApiUser();
        }
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
                                {infoUser.username ? (
                                    <>
                                        <h2>Username:</h2>
                                        <p>{infoUser.username}</p>
                                    </>
                                ) : (
                                    <>
                                        <h2>ID:</h2>
                                        <p>{infoUser.id}</p>
                                    </>
                                )}
                            </div>
                            {infoUser.username ? (
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
                            ) : null}
                        </div>
                        <div className={cx('img-profile')}>
                            <img
                                className={cx('img-avatar')}
                                src={`${changeAvatar || infoUser.avatar || image.avatarDefault}`}
                                alt={'avatar'}
                            />
                            <div className={cx('logout')}>
                                <div className={cx('change-avatar')}>
                                    <form action="/form/sumbit" method="get">
                                        <label className={cx('label')}>
                                            <input type={'file'} required onChange={(e) => handleChangeAvatar(e)} />
                                            <span>Change Avatar</span>
                                        </label>
                                    </form>
                                </div>
                                <button onClick={handleLogout}>Logout</button>
                                <button onClick={handleDeleteAccount}>Delete account</button>
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
