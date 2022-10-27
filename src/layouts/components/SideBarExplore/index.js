import classNames from 'classnames/bind';
import { useEffect, useState, useContext } from 'react';
import Genre from '../../../apiServices/genreService';
import styles from './SideBarExplore.module.scss';
import { useLocation, useParams } from 'react-router-dom';
import { GenreContext } from '../../../layouts/ExploreLayout/GenreContext';
import Box from '@mui/material/Box';

import Slider from '@mui/material/Slider';

const cx = classNames.bind(styles);

function SideBarExplore({ handle }) {
    const location = useLocation();
    const genreContext = useContext(GenreContext);
    let { type } = useParams();
    if (location.pathname === '/explore/tv') {
        type = 'tv';
    } else if (location.pathname === 'explore/movie') {
        type = 'movie';
    }

    const [genre, setGenre] = useState([]);

    const handleChange = (event, newValue) => {
        genreContext.setValueMin(newValue);
    };

    useEffect(() => {
        const featchApi = async () => {
            try {
                const res = await Genre(type);
                setGenre(res);
            } catch (error) {}
        };
        featchApi();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [type]);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('menu-genres')}>
                    {genre.map((res) => {
                        return (
                            <button
                                className={cx(
                                    `btn-genre`,
                                    `${genreContext.gen.includes(res.id) ? 'active' : undefined}`,
                                )}
                                key={res.id}
                                onClick={() => {
                                    genreContext.handleAddGenre(res.id);
                                    handle();
                                }}
                            >
                                {res.name}
                            </button>
                        );
                    })}
                </div>
                <div className={cx('minute')}>
                    <h1>Runtime</h1>

                    <Box sx={{ width: 200 }} className={cx('slider')}>
                        <Slider
                            getAriaLabel={() => 'Minute'}
                            value={genreContext.valueMin}
                            min={0}
                            max={200}
                            onChange={handleChange}
                            valueLabelDisplay="auto"
                        />
                        <h4 className={cx('left')}>From {genreContext.valueMin[0]} min</h4>
                        <h4 className={cx('right')}>To {genreContext.valueMin[1]} min</h4>
                    </Box>
                </div>
            </div>
        </div>
    );
}

export default SideBarExplore;
