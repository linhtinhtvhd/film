import { useState, createContext } from 'react';

const LoginContext = createContext();

function LoginProvider({ children }) {
    const [isLogin, setIsLogin] = useState(false);
    const [user, setUser] = useState({
        username: '',
        password: '',
    });
    const [newListfilm, setNewListfilm] = useState([]);
    const [token, setToken] = useState('');

    const value = { isLogin, setIsLogin, user, setUser, token, setToken, newListfilm, setNewListfilm };
    return <LoginContext.Provider value={value}>{children}</LoginContext.Provider>;
}

export default LoginProvider;

export { LoginContext };
