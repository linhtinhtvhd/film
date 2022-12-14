import classNames from 'classnames/bind';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styles from './Search.module.scss';
import { useContext, useEffect, useState, useRef } from 'react';
import api from '../../assets/Api';
import * as request from '../../utils/request';
import { SearchContext } from '../../layouts/SearchLayout/SearchContext';
import { FaSearch } from 'react-icons/fa';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import { LazyLoadImage } from 'react-lazy-load-image-component';
const cx = classNames.bind(styles);
function Search() {
    const navigate = useNavigate();
    const location = useLocation();
    const search = location.search;
    const valueInput = useRef();
    let params = new URLSearchParams(search);
    const query = params.get('query');
    let pag = params.get('page');
    const searchContext = useContext(SearchContext);
    const [films, setFilms] = useState(false);
    const [numberPage, setNumberPage] = useState();
    const [page, setPage] = useState(1);

    const handleChangePage = (event, value) => {
        setPage(value);
        window.scrollTo({
            behavior: 'smooth',
            top: valueInput.current.offsetTop,
        });
    };
    const handleInput = (e) => {
        searchContext.setSearchValue(e.target.value);
    };
    const handleLink = (e) => {
        if (e.keyCode === 13) {
            navigate(`/search?query=${searchContext.searchValue}`);
        }
    };
    useEffect(() => {
        const featchApi = async () => {
            try {
                const res = await request.get(`search/${searchContext.type}`, {
                    params: {
                        api_key: `${api.key}`,
                        query: `${query}`,
                        page: pag,
                    },
                });
                setNumberPage(res.total_pages);
                setFilms((prev) => {
                    prev = res.results.filter((result) => {
                        return !!(result.poster_path || result.profile_path);
                    });
                    return prev;
                });
            } catch (error) {}
        };

        featchApi();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchContext.type, query, page]);

    return (
        <div className={cx('inner')}>
            <div className={cx('search')}>
                <Link to={`/search?query=${searchContext.searchValue}`}>
                    <button
                        className={cx('btn-search')}
                        onClick={() => {
                            valueInput.current.value = '';
                        }}
                    >
                        <FaSearch />
                    </button>
                </Link>
                <input
                    ref={valueInput}
                    onChange={(e) => {
                        handleInput(e);
                    }}
                    onKeyUp={(e) => {
                        handleLink(e);
                    }}
                    className={cx('input-search')}
                    placeholder="Type to Search..."
                />
            </div>

            {films.length > 0 ? (
                <div className={cx('table-film')}>
                    {films.map((res) => {
                        return (
                            <div className={cx('film')} key={res.id}>
                                <Link
                                    to={`${
                                        searchContext.type === 'multi'
                                            ? `/${res.media_type}/${res.id}`
                                            : `/${searchContext.type}/${res.id}`
                                    }`}
                                    className={cx('link')}
                                >
                                    <LazyLoadImage
                                        className={cx('img-film')}
                                        src={`${api.img}${res.poster_path}`}
                                        alt={res.original_title}
                                    />
                                    <p className={cx('name-film')}>
                                        {res.original_title || res.original_name || res.name}
                                    </p>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className={cx('error')}>
                    <h1>??i b???n ??i, c??i b???n t??m kh??ng c?? ????u!</h1>
                </div>
            )}
            <div className={cx('pagination')}>
                <Stack spacing={50}>
                    <Pagination
                        count={numberPage}
                        variant="outlined"
                        shape="rounded"
                        size="large"
                        color="primary"
                        boundaryCount={2}
                        onChange={handleChangePage}
                        renderItem={(item) => (
                            <PaginationItem
                                component={Link}
                                to={`/search?query=${query}${item.page === 1 ? '' : `&&page=${item.page}`}`}
                                {...item}
                            />
                        )}
                    />
                </Stack>
            </div>
        </div>
    );
}

export default Search;
