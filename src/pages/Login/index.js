import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import styles from './Login.module.scss';
import { LoginUser } from '../../apiServices/userService';

import { LoginContext } from '../../layouts/LoginLayout/LoginContext';
import image from '../../img';
const cx = classNames.bind(styles);

function Login() {
    const navigate = useNavigate();
    const { setUser, setToken } = useContext(LoginContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorUsername, setErrorUsername] = useState('');
    const [errorpassword, setErrorpassword] = useState('');
    const [errorLogin, setErrorLogin] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        const res = await LoginUser(username, password);

        setTimeout(() => {
            if (res) {
                navigate('/profile');
                setToken(res);
                setUser({ username, password });
                localStorage.setItem('isLogin', true);
            } else {
                setErrorLogin(true);
                setUsername('');
                setPassword('');
            }
        }, 2000);
    };
    return (
        <div className={cx('login-page')}>
            <div className={cx('background')}>
                <video autoPlay loop playsInline className="video-background" muted poster={image.sci}>
                    <source src="https://raw.githubusercontent.com/fuocy/video/master/endgame.mp4" type="video/mp4" />
                </video>
            </div>
            <div className={cx('form')}>
                <div className={cx('login')}>
                    <div className={cx('login-header')}>
                        <h3>LOGIN</h3>
                        <p>Please enter your credentials to login.</p>
                    </div>
                    {/* <div className={cx('face')}>
                        <img
                            className={cx('logo-img')}
                            src={image.facebook}
                            alt="facebook"
                            onClick={() => {
                                window.open('https://filmpinklink.herokuapp.com/auth/facebook', '_self');
                            }}
                        />
                        <img
                            className={cx('logo-img')}
                            src={image.google}
                            alt="google"
                            onClick={() => {
                                window.open('https://filmpinklink.herokuapp.com/auth/google', '_self');
                            }}
                        />
                    </div> */}
                </div>
                {errorLogin ? (
                    <div className={cx('error-login')}>Tên tài khoản hoặc mật khẩu không chính xác!</div>
                ) : null}
                <form className={cx('login-form')} onSubmit={handleLogin}>
                    <div className={cx('input')}>
                        <input
                            type={'email'}
                            placeholder="Username or Email"
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value);
                                setErrorLogin(false);
                                if (e.target.value.length > 5 && e.target.value.length < 31) {
                                    setErrorUsername('');
                                }
                            }}
                            onBlur={(e) => {
                                if (e.target.value.length < 6 || e.target.length > 30) {
                                    setErrorUsername(
                                        'The username must be more than 6 and less than 30 characters long',
                                    );
                                }
                            }}
                        />
                        <div className={cx('error', `${errorUsername ? 'active-error' : null}`)}>{errorUsername}</div>
                    </div>
                    <div className={cx('input')}>
                        <input
                            type={'password'}
                            placeholder="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setErrorLogin(false);
                                if (e.target.value.length > 5 && e.target.value.length < 31) {
                                    setErrorpassword('');
                                }
                            }}
                            onBlur={(e) => {
                                if (e.target.value.length < 6 || e.target.length > 30) {
                                    setErrorpassword(
                                        'The password must be more than 6 and less than 30 characters long',
                                    );
                                    if (e.target.value.length > 5 && e.target.value.length < 31) {
                                        setErrorpassword('');
                                    }
                                }
                            }}
                        />
                        <div className={cx('error', `${errorpassword ? 'active-error' : null}`)}>{errorpassword}</div>
                    </div>
                    <button>login</button>
                    <p className={cx('message')}>Not registered?</p>
                    <Link className={cx('toSignUp')} to={`/signup`}>
                        Sign Up
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default Login;
