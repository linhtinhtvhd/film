import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';

import Header from './Header';
import SideBar from '~/layouts/components/SideBar';
import Content from '~/layouts/components/Content';
import MainContent from '~/layouts/components/MainContent';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
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
