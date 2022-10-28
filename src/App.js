import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes';
import { DefaultLayout } from './layouts';
import { Fragment, useEffect, useContext } from 'react';
import axios from 'axios';
import { LoginContext } from './layouts/LoginLayout/LoginContext';
function App() {
    const { setInfoUser, setIsLogin, setUserId } = useContext(LoginContext);

    useEffect(() => {
        const getUserId = async () => {
            await axios({
                method: 'GET',
                url: 'https://film-pinklink.herokuapp.com/auth/login/success',
                withCredentials: true,
            }).then((res) => {
                console.log(res.data.user.profile.id);
                if (res) {
                    setIsLogin(true);
                    localStorage.setItem('isLogin', true);
                    localStorage.setItem('token', JSON.stringify(res.data.user.token));
                }
                setUserId(res.data.user.profile.id);
                setInfoUser(res.data.user.profile);
            });
        };
        getUserId();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        let Layout = DefaultLayout;

                        const Page = route.component;
                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
