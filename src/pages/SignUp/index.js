import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import styles from './SignUp.module.scss';
import { Link } from 'react-router-dom';
import { SignUp } from '../../apiServices/userService';

const cx = classNames.bind(styles);

function Login() {
    const nameRef = useRef();
    const userRef = useRef();
    const passRef = useRef();
    const RepassRef = useRef();
    const [errorFullname, setErrorFullname] = useState('');
    const [errorUsername, setErrorUsername] = useState('');
    const [errorpassword, setErrorpassword] = useState('');
    const [errorRepassword, setErrorRepassword] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [fullname, setFullname] = useState('');
    const [rePassword, setRePassword] = useState('');

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (fullname.length === 0) {
            setErrorFullname('The name is required');
        } else if (username < 6 && username > 30) {
            setErrorUsername('The username must be more than 6 and less than 30 characters long');
        } else if (password < 6 && password > 30) {
            setErrorUsername('The username must be more than 6 and less than 30 characters long');
        } else if (rePassword < 6 && rePassword > 30) {
            setErrorUsername('The username must be more than 6 and less than 30 characters long');
        } else if (rePassword !== password) {
            setErrorRepassword('Nhập lại mật khẩu đi ông cháu ơi!');
        } else {
            await SignUp(fullname, username, password);
            nameRef.current.value = '';
            userRef.current.value = '';
            passRef.current.value = '';
            RepassRef.current.value = '';
            alert('Đăng kí thành công');
        }
    };
    useEffect(() => {}, [rePassword]);
    return (
        <div className={cx('login-page')}>
            <div className={cx('background')}>
                <video autoPlay loop playsInLine className="video-background" muted>
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
                <form className={cx('login-form')} onSubmit={handleSignUp}>
                    <div className={cx('input')}>
                        <input
                            ref={nameRef}
                            type={'text'}
                            placeholder="fullname"
                            onChange={(e) => {
                                setFullname(e.target.value);
                                if (e.target.value.length > 0) {
                                    setErrorFullname('');
                                }
                            }}
                            onBlur={(e) => {
                                if (e.target.value.length === 0) {
                                    setErrorFullname('The name is required');
                                }
                            }}
                        />
                        <div className={cx('error', `${errorFullname ? 'active-error' : null}`)}>{errorFullname}</div>
                    </div>
                    <div className={cx('input')}>
                        <input
                            ref={userRef}
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
                            ref={passRef}
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
                    <div className={cx('input')}>
                        <input
                            ref={RepassRef}
                            type={'password'}
                            placeholder="password"
                            onChange={(e) => {
                                setRePassword(e.target.value);
                                if (e.target.value.length > 5 && e.target.value.length < 31) {
                                    setErrorpassword('');
                                }
                            }}
                            onBlur={(e) => {
                                if (e.target.value.length < 6 || e.target.length > 30) {
                                    setErrorRepassword(
                                        'The Repassword must be more than 6 and less than 30 characters long',
                                    );
                                    if (e.target.value.length > 5 && e.target.value.length < 31) {
                                        setErrorRepassword('');
                                    }
                                }
                            }}
                        />
                        <div className={cx('error', `${errorRepassword ? 'active-error' : null}`)}>
                            {errorRepassword}
                        </div>
                    </div>
                    <button>Sign Up</button>
                    <p className={cx('message')}>Already a member</p>
                    <Link to={`/login`}>Login</Link>
                </form>
            </div>
        </div>
    );
}

export default Login;
