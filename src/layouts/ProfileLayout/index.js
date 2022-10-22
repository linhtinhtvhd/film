import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import Header from '~/layouts/DefaultLayout/Header';

const cx = classNames.bind(styles);

function ProfileLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            {children}
        </div>
    );
}

export default ProfileLayout;
