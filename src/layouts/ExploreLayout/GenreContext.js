import { useState, createContext } from 'react';

const GenreContext = createContext();

function GenreProvider({ children }) {
    const [gen, setGen] = useState([]);

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

    const value = { gen, handleAddGenre };
    return <GenreContext.Provider value={value}>{children}</GenreContext.Provider>;
}

export default GenreProvider;

export { GenreContext };
