import classNames from 'classnames/bind';
import styles from './WatchLayout.module.scss';

const cx = classNames.bind(styles);

function MvTvLayout({ children }) {
    return <div className={cx('wrapper')}>{children}</div>;
}
export default MvTvLayout;
