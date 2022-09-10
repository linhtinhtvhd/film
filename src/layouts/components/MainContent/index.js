import classNames from 'classnames/bind';
import ContentGenre from '~/layouts/components/ContentGenre';
import SwiperSlider from '~/layouts/components/SwiperSlider';
import styles from './MainContent.module.scss';
import Trending from '~/apiServices/trendingService';
import MvPopular from '~/apiServices/popularServiceMv';
import TvPopular from '~/apiServices/popularServiceTv';

const cx = classNames.bind(styles);

function MainContent() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <ContentGenre />
                <SwiperSlider
                    custom_btn={['custom_next1', 'custom_prev2']}
                    service={Trending}
                    tittle={'Trending'}
                    href={false}
                />
                <SwiperSlider
                    custom_btn={['custom_next3', 'custom_prev4']}
                    service={MvPopular}
                    tittle={'Movie Popular'}
                    href={'movie'}
                />
                <SwiperSlider
                    custom_btn={['custom_next5', 'custom_prev6']}
                    service={TvPopular}
                    tittle={'Tv Popular'}
                    href={'tv'}
                />
            </div>
        </div>
    );
}

export default MainContent;
