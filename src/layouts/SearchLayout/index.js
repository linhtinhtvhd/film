import classNames from 'classnames/bind';
import { useRef } from 'react';
import styles from './SearchLayout.module.scss';
import Header from '../../layouts/DefaultLayout/Header';

import SideBarSearch from '../../layouts/components/SideBarSearch';

const cx = classNames.bind(styles);

function SearchLayout({ children }) {
    const button1Ref = useRef();
    const handleBtnRef = () => {
        window.scrollTo({
            behavior: 'smooth',
            top: button1Ref.current.offsetTop,
        });
    };
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <div className={cx('inner')}>
                    <div className={cx('sidebar-top')}>
                        <SideBarSearch handle={handleBtnRef} />
                    </div>
                    <div ref={button1Ref} className={cx('content')}>
                        {children}
                    </div>
                </div>
                <div className={cx('sidebar-left')}>
                    <SideBarSearch handle={handleBtnRef} />
                </div>
            </div>
        </div>
    );
}

export default SearchLayout;
