import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import Content from '../../layouts/components/Content';
import { useEffect, useContext } from 'react';
import Header from './Header';
import MainContent from '../../layouts/components/MainContent';
import { LoginContext } from '../../layouts/LoginLayout/LoginContext';
import axios from 'axios';
const cx = classNames.bind(styles);

function DefaultLayout() {
    const { setInfoUser, setIsLogin, setUserId } = useContext(LoginContext);

    useEffect(() => {
        const getUserId = () => {
            axios({
                method: 'GET',
                url: 'https://film-pinklink.herokuapp.com/auth/login/success',

                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
            }).then((res) => {
                console.log(res.data.user.profile.id);
                if (res) {
                    setIsLogin(true);
                    localStorage.setItem('isLogin', true);
                    localStorage.setItem('token', JSON.stringify(res.data.user.token));
                }
                setUserId(res.data.user.profile.id);
                setInfoUser(res.data.user.profile);
            });
        };
        getUserId();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <div className={cx('inner')}>
                    <Content />

                    <MainContent />
                </div>
            </div>
        </div>
    );
}

export default DefaultLayout;
