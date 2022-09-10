import classNames from 'classnames/bind';
import { FaSearch } from 'react-icons/fa';
import styles from './Search.module.scss';

const cx = classNames.bind(styles);
function Search() {
    return (
        <div>
            <div className={cx('search')}>
                <button className={cx('btn-search')}>
                    <FaSearch />
                </button>
                <input className={cx('input-search')} placeholder="Type to Search..." />
            </div>
        </div>
    );
}

export default Search;
