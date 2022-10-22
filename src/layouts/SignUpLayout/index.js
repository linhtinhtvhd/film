import classNames from 'classnames/bind';
import styles from './SignUpLayout.module.scss';
import Header from '~/layouts/DefaultLayout/Header';

const cx = classNames.bind(styles);

function SignUpLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            {children}
        </div>
    );
}

export default SignUpLayout;
