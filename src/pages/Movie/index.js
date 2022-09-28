import classNames from 'classnames/bind';
import SwiperSlider from '~/layouts/components/SwiperSlider';
import styles from './Movie.module.scss';
import MvNowPlay from '~/apiServices/nowPlayServiceMv';
import MvPopular from '~/apiServices/popularServiceMv';
import MvTopRated from '~/apiServices/topRatedServiceMv';
import MvUpComing from '~/apiServices/upComingServiceMv';
const cx = classNames.bind(styles);

function Movie() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <SwiperSlider
                    custom_btn={['custom_next1', 'custom_prev2']}
                    service={MvPopular}
                    tittle={'Movie Popular'}
                    href={'movie'}
                    slidesPerView={5}
                    slidesPerGroup={5}
                />
                <SwiperSlider
                    custom_btn={['custom_next3', 'custom_prev4']}
                    service={MvUpComing}
                    tittle={'UpComing'}
                    href={'movie'}
                    slidesPerView={5}
                    slidesPerGroup={5}
                />
                <SwiperSlider
                    custom_btn={['custom_next5', 'custom_prev6']}
                    service={MvTopRated}
                    tittle={'Top Rated'}
                    href={'movie'}
                    slidesPerView={5}
                    slidesPerGroup={5}
                />
                <SwiperSlider
                    custom_btn={['custom_next7', 'custom_prev8']}
                    service={MvNowPlay}
                    tittle={'Now Playing'}
                    href={'movie'}
                    slidesPerView={5}
                    slidesPerGroup={5}
                />
            </div>
        </div>
    );
}

export default Movie;
