import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import Content from '../../layouts/components/Content';

import Header from './Header';
import MainContent from '~/layouts/components/MainContent';

const cx = classNames.bind(styles);

function DefaultLayout() {
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
