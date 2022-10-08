import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import { useState, useEffect, lazy, Suspense } from 'react';

import Header from './Header';
import MainContent from '~/layouts/components/MainContent';

const cx = classNames.bind(styles);
const Content = lazy(() => import('~/layouts/components/Content'));

function DefaultLayout() {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <div className={cx('inner')}>
                    <Suspense
                        fallback={
                            <div
                                className={cx('loading')}
                                style={{
                                    width: `${window.innerWidth}`,
                                    height: `${(window.innerWidth * 9) / 16}px`,
                                    backgroundColor: '#302f2f',
                                }}
                            ></div>
                        }
                    >
                        {' '}
                        <Content />
                    </Suspense>
                    <MainContent />
                </div>
            </div>
        </div>
    );
}

export default DefaultLayout;
