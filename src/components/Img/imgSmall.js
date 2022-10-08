import api from '~/assets/Api';
import classNames from 'classnames/bind';
import styles from './Img.module.scss';

const cx = classNames.bind(styles);
function ImgSmall({ result }) {
    return <img src={`${api.img}${result.poster_path}`} className={cx('img-content')} alt="film" />;
}

export default ImgSmall;
