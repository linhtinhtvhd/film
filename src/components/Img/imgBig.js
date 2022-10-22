import api from '~/assets/Api';
import classNames from 'classnames/bind';
import styles from './Img.module.scss';

const cx = classNames.bind(styles);
function ImgBig({ result }) {
    return <img src={`${api.img}${result.backdrop_path}`} className={cx('img-content')} alt="film" />;
}

export default ImgBig;