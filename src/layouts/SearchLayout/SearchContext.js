import { useState, createContext } from 'react';
const SearchContext = createContext();

function SearchProvider({ children }) {
    const [searchValue, setSearchValue] = useState();
    const [type, setType] = useState('multi');
    const handleType = (e) => {
        setType(e.target.value);
    };

    const value = { searchValue, type, handleType, setSearchValue };
    return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
}

export default SearchProvider;
export { SearchContext };
