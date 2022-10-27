import { useState, createContext } from 'react';

const LoginContext = createContext();

function LoginProvider({ children }) {
    const [isLogin, setIsLogin] = useState(false);
    const [user, setUser] = useState({
        username: '',
        password: '',
    });
    const [userId, setUserId] = useState();
    const [infoUser, setInfoUser] = useState();
    const [newListfilm, setNewListfilm] = useState([]);
    const [changeAvatar, setChangeAvatar] = useState('');
    const [token, setToken] = useState('');

    const value = {
        isLogin,
        setIsLogin,
        user,
        setUser,
        token,
        setToken,
        newListfilm,
        setNewListfilm,
        changeAvatar,
        setChangeAvatar,
        infoUser,
        setInfoUser,
        userId,
        setUserId,
    };
    return <LoginContext.Provider value={value}>{children}</LoginContext.Provider>;
}

export default LoginProvider;

export { LoginContext };
