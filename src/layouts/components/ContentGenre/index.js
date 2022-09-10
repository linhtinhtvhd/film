import axios from 'axios';
import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import api from '~/assets/Api';
import styles from './ContentGenre.module.scss';

const cx = classNames.bind(styles);
function ContentGenre() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content-tittle')}>
                <h6>Choose Categores</h6>
                <h2>
                    Top Categories Movies <br /> to Watch Now
                </h2>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                    industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type
                    and scrambled it to make a type specimen book
                </p>
            </div>
            <div className={cx('content')}>
                <div className={cx('content-left')}>
                    <div className={cx('genre-item')}>
                        <img className={cx('genre-img')} src="http://akthemes.com/video/images/category/horror.jpg" />
                        <span>Horror</span>
                    </div>
                    <div className={cx('genre-item')}>
                        <img className={cx('genre-img')} src="http://akthemes.com/video/images/category/comedy.jpg" />
                        <span>Comedy</span>
                    </div>
                </div>
                <div className={cx('content-right')}>
                    <div className={cx('genre-item')}>
                        <img className={cx('genre-img')} src="http://akthemes.com/video/images/category/sci.jpg" />
                        <span>Sci-Fi</span>
                    </div>
                    <div className={cx('genre-item')}>
                        <img className={cx('genre-img')} src="http://akthemes.com/video/images/category/action.jpg" />
                        <span>Actions</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContentGenre;
