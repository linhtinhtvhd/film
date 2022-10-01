import { useState, createContext } from 'react';

const GenreContext = createContext();

function GenreProvider({ children }) {
    const [gen, setGen] = useState([]);
    const [valueMin, setValueMin] = useState([0, 250]);

    const handleAddGenre = (id) => {
        setGen((prev) => {
            const checked = gen.includes(id);
            if (checked) {
                return gen.filter((item) => item !== id);
            } else {
                return [...prev, id];
            }
        });
    };

    const value = { gen, handleAddGenre, valueMin, setValueMin };
    return <GenreContext.Provider value={value}>{children}</GenreContext.Provider>;
}

export default GenreProvider;

export { GenreContext };
