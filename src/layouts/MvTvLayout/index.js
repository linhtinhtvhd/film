import classNames from 'classnames/bind';
import styles from './MvTvLayout.module.scss';
import Header from '../../layouts/DefaultLayout/Header';
import SideBar from '../../layouts/components/SideBar';

const cx = classNames.bind(styles);

function MvTvLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <div className={cx('inner')}>
                    <div className={cx('content')}>{children}</div>
                </div>
                <SideBar />
            </div>
        </div>
    );
}
export default MvTvLayout;
