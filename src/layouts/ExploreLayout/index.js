import classNames from 'classnames/bind';
import styles from './ExploreLayout.module.scss';
import Header from '../../layouts/DefaultLayout/Header';
import SideBarExplore from '../../layouts/components/SideBarExplore';
import GenreProvider from './GenreContext';
import { useRef } from 'react';
const cx = classNames.bind(styles);

function ExploreLayout({ children }) {
    const button1Ref = useRef();
    const handleBtnRef = () => {
        window.scrollTo({
            behavior: 'smooth',
            top: button1Ref.current.offsetTop,
        });
    };
    return (
        <GenreProvider>
            <div className={cx('wrapper')}>
                <Header />
                <div className={cx('container')}>
                    <div className={cx('inner')}>
                        <div className={cx('sidebar-top')}>
                            <SideBarExplore handle={handleBtnRef} />
                        </div>
                        <div ref={button1Ref} className={cx('content')}>
                            {children}
                        </div>
                    </div>
                    <div className={cx('sidebar-left')}>
                        <SideBarExplore handle={handleBtnRef} />
                    </div>
                </div>
            </div>
        </GenreProvider>
    );
}
export default ExploreLayout;
