import classNames from 'classnames/bind';
import SwiperSlider from '../../layouts/components/SwiperSlider';
import styles from './Tvshow.module.scss';
import TvAringToDay from '../../apiServices/airingToDayServiceTv';
import TvPopular from '../../apiServices/popularServiceTv';
import TvTopRated from '../../apiServices/topRatedServiceTv';
import TvOnTheAir from '../../apiServices/onTheAirServiceTv';
const cx = classNames.bind(styles);

function Movie() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <SwiperSlider
                    custom_btn={['custom_next1', 'custom_prev2']}
                    service={TvPopular}
                    tittle={'TvShow Popular'}
                    href={'tv'}
                    slidesPerView={4.5}
                    slidesPerGroup={4}
                />
                <SwiperSlider
                    custom_btn={['custom_next3', 'custom_prev4']}
                    service={TvTopRated}
                    tittle={'Top Rated'}
                    href={'tv'}
                    slidesPerView={4.5}
                    slidesPerGroup={4}
                />
                <SwiperSlider
                    custom_btn={['custom_next5', 'custom_prev6']}
                    service={TvOnTheAir}
                    tittle={'On The Air'}
                    href={'tv'}
                    slidesPerView={4.5}
                    slidesPerGroup={4}
                />
                <SwiperSlider
                    custom_btn={['custom_next7', 'custom_prev8']}
                    service={TvAringToDay}
                    tittle={'Aring Today'}
                    href={'tv'}
                    slidesPerView={4.5}
                    slidesPerGroup={4}
                />
            </div>
        </div>
    );
}

export default Movie;
