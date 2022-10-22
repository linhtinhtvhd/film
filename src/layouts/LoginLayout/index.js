import classNames from 'classnames/bind';
import styles from './LoginLayout.module.scss';
import Header from '~/layouts/DefaultLayout/Header';

const cx = classNames.bind(styles);

function LoginLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            {children}
        </div>
    );
}

export default LoginLayout;
