import classNames from 'classnames/bind';
import { useContext } from 'react';
import styles from './SideBarSearch.module.scss';
import { SearchContext } from '../../../layouts/SearchLayout/SearchContext';
const cx = classNames.bind(styles);

function SideBarSearch({ handle }) {
    const searchContext = useContext(SearchContext);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('menu')}>
                <button
                    value={'multi'}
                    className={cx('btn', `${searchContext.type === 'multi' ? `active` : undefined}`)}
                    onClick={(e) => {
                        searchContext.handleType(e);
                        handle();
                    }}
                >
                    All
                </button>
                <button
                    value={'movie'}
                    className={cx('btn', `${searchContext.type === 'movie' ? `active` : undefined}`)}
                    onClick={(e) => {
                        searchContext.handleType(e);
                        handle();
                    }}
                >
                    Movie
                </button>
                <button
                    value={'tv'}
                    className={cx('btn', `${searchContext.type === 'tv' ? `active` : undefined}`)}
                    onClick={(e) => {
                        searchContext.handleType(e);
                        handle();
                    }}
                >
                    Tvshow
                </button>
                <button
                    value={'person'}
                    className={cx('btn', `${searchContext.type === 'person' ? `active` : undefined}`)}
                    onClick={(e) => {
                        searchContext.handleType(e);
                        handle();
                    }}
                >
                    People
                </button>
            </div>
        </div>
    );
}

export default SideBarSearch;
