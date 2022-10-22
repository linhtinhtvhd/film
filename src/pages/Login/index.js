import classNames from 'classnames/bind';
import { useState, useContext } from 'react';
import styles from './Login.module.scss';
import { LoginUser } from '~/apiServices/userService';
import { Link, useNavigate } from 'react-router-dom';
import { LoginContext } from '~/layouts/LoginLayout/LoginContext';
import image from '~/img';
const cx = classNames.bind(styles);

function Login() {
    const navigate = useNavigate();
    const { setUser, setToken } = useContext(LoginContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorUsername, setErrorUsername] = useState('');
    const [errorpassword, setErrorpassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        const res = await LoginUser(username, password);
        if (res) {
            navigate('/profile');
            setToken(res);
            setUser({ username, password });
            localStorage.setItem('isLogin', true);
        }
    };
    return (
        <div className={cx('login-page')}>
            <div className={cx('background')}>
                <video autoPlay loop playsInLine className="video-background" muted poster={image.sci}>
                    <source src="https://raw.githubusercontent.com/fuocy/video/master/endgame.mp4" type="video/mp4" />
                </video>
            </div>
            <div className={cx('form')}>
                <div className={cx('login')}>
                    <div className={cx('login-header')}>
                        <h3>LOGIN</h3>
                        <p>Please enter your credentials to login.</p>
                    </div>
                </div>
                <form className={cx('login-form')} onSubmit={handleLogin}>
                    <div className={cx('input')}>
                        <input
                            type={'email'}
                            placeholder="username"
                            onChange={(e) => {
                                setUsername(e.target.value);
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
                            onChange={(e) => {
                                setPassword(e.target.value);
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
                    <Link to={`/signup`}>Sign Up</Link>
                </form>
            </div>
        </div>
    );
}

export default Login;
