import classNames from 'classnames/bind';
import { FaSearch } from 'react-icons/fa';
import styles from './Search.module.scss';
import { SearchContext } from '../../../layouts/SearchLayout/SearchContext';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);
function Search() {
    const navigate = useNavigate();
    const searchContext = useContext(SearchContext);
    const handleLink = (e) => {
        if (e.keyCode === 13) {
            navigate(`/search?query=${searchContext.searchValue}`);
        }
    };

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
                    onKeyUp={(e) => {
                        handleLink(e);
                    }}
                />
            </div>
        </div>
    );
}

export default Search;
