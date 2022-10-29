import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes';
import { DefaultLayout } from './layouts';
import { Fragment, useEffect, useContext } from 'react';
import { User } from './apiServices/userService';
import axios from 'axios';
import { LoginContext } from './layouts/LoginLayout/LoginContext';
function App() {
    const { setInfoUser, setIsLogin, setUserId } = useContext(LoginContext);

    useEffect(() => {
        const getUserId = async () => {
            try {
                const res = await User();
                console.log(res);
            } catch (error) {}
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
