import classNames from 'classnames/bind';
import { FaSearch } from 'react-icons/fa';
import styles from './Search.module.scss';
import { SearchContext } from '~/layouts/SearchLayout/SearchContext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);
function Search() {
    const searchContext = useContext(SearchContext);

    return (
        <div>
            <div className={cx('search')}>
                <Link to={`/search?query=${searchContext.searchValue}`}>
                    <button className={cx('btn-search')}>
                        <FaSearch />
                    </button>
                </Link>

                <input
                    className={cx('input-search')}
                    placeholder="Type to Search..."
                    onChange={(e) => {
                        searchContext.setSearchValue(e.target.value);
                    }}
                />
            </div>
        </div>
    );
}

export default Search;
